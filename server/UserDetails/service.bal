import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/log;

// import ballerina/sql;
// import ballerina/os;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

// configurable string clientIDIdentityCheck = ?;
// configurable string clientSecretIdentityCheck = ?;

// configurable string clientIDPoliceCheck = ?;
// configurable string clientSecretPoliceCheck = ?;

configurable string clientIDAdressCheck = ?;
configurable string clientSecretAddressCheck = ?;

final mysql:Client dbClient = check new (
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = "GramaCheck"
);

public type userDetails record {|
    int Citizen_id;
    string userID;
    string full_name;
    string house_number;
    string street_name;
    string area_post_office;
    string city;
    string gs_division_number;
    string district;
    string sex;
    boolean whetherSriLankan;
    string religion;
    string occupation;
    string NIC;
    time:Date DOB;

|};

public type requestDetails record {
    time:Date requested_date;
    time:Date required_date;
    string reason;
};

public type requestPostDetails record {|
    int Citizen_id;
    time:Date requested_date;
    time:Date required_date;
    string request_status;
    string reason;
|};

// public type CombinedResult record {
//     userDetails user;
//     requestDetails request;
// };

type ErrorDetails record {
    string message;
    string details;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

public type allDetails record {|
    int Citizen_id;
    string userID;
    string full_name;
    string house_number;
    string street_name;
    string area_post_office;
    string city;
    string gs_division_number;
    string district;
    string sex;
    boolean whetherSriLankan;
    string religion;
    string occupation;
    string NIC;
    string gs_ID;
    time:Date DOB;
    int request_id;
    time:Date requested_date;
    time:Date required_date;
    string request_status;
    string reason;


|};

public type CombinedUserData record {
    allDetails user;
    boolean isCriminal;
    boolean isaddressVerified;
    boolean isIdentityVerified;
};

# A service representing a network-accessible API
# bound to port `9090`.
service /userDetails on new http:Listener(9090) {

    //to display user details for each user
    resource function get userData/[string NIC]/[string houseNumber]/[string areaPostOffice]/[string city]/[string gsDivisionNumber]/[string streetName]/[string userID]/[string district]() returns CombinedUserData|error {

        allDetails user = check dbClient->queryRow(
        `SELECT Citizen.*,Requests.request_id,Requests.requested_date,Requests.required_date, Requests.request_status,Requests.reason
        FROM Citizen 
        JOIN Requests ON Citizen.Citizen_id = Requests.Citizen_id 
         WHERE NIC = ${NIC}`
    );

      //  string accessTokenPoliceChek =  check getAccessToken(clientIDPoliceCheck,clientSecretPoliceCheck);
       // string accessTokenIdentityChek =  check getAccessToken(clientIDIdentityCheck,clientSecretIdentityCheck);
        string accessTokenAddressChek =  check getAccessToken(clientIDAdressCheck,clientSecretAddressCheck);



        // http:Client policeCheckClient = check new ("https://1adbbcb2-28ed-4caa-ace8-6191b640cb48-dev.e1-us-east-azure.choreoapis.dev/xqfp/police-check-api/police-check-api-46e/v1");
        // // Sends a `GET` request to the "/criminalData"
        // boolean|http:ClientError isCriminal = check policeCheckClient->/criminalData/[NIC](headers = {accessTokenPoliceChek});

        http:Client addressCheckClient = check new ("https://1adbbcb2-28ed-4caa-ace8-6191b640cb48-prod.e1-us-east-azure.choreoapis.dev/xqfp/address-check-api/adress-check-api-186/v1");
        // Sends a `GET` request to the "/validateNIC"
        boolean|http:ClientError isaddressVerified = check addressCheckClient->/checkAddress/[gsDivisionNumber]/[houseNumber]/[streetName]/[areaPostOffice]/[city]/[district]/[userID](headers = {accessTokenAddressChek});

     //   http:Client IdentityCheckClient = check new ("http://identity-check-service-ogo-588361154:9090/IdentityCheck");
        // Sends a `GET` request to the "/criminalData"
    //    boolean|http:ClientError isIdentityVerified = check IdentityCheckClient->/validateNIC/[NIC]/[gsDivisionNumber]/[userID](headers = {accessTokenIdentityChek});

        // Create CombinedUserData record
        CombinedUserData userData = {
            user: user,
            // isaddressVerified: check isIdentityVerified,
            isaddressVerified: true,
            isIdentityVerified: check isaddressVerified,
            // isCriminal: check isCriminal
             isCriminal: true
        };
        return userData;

     
    }

    //get all requests data for the relavant gs
    resource function get requestData/[string gsDivisionCode]() returns allDetails[]|error {

        allDetails[] citizenRequests = [];
        stream<allDetails, error?> resultStream = dbClient->query(
        `SELECT Citizen.*,Requests.requested_date,Requests.required_date, Requests.request_status
        FROM Citizen 
JOIN Requests ON Citizen.Citizen_id = Requests.Citizen_id 
WHERE gs_division_number = ${gsDivisionCode};`
    );
        check from allDetails citizen in resultStream
            do {
                citizenRequests.push(citizen);
            };
        check resultStream.close();
        return citizenRequests;
    }

    resource function post userRequestDetails/[string NIC](@http:Payload requestDetails request) returns error|http:Ok {

        int citizenID = check dbClient->queryRow(
        `SELECT Citizen_id FROM Citizen WHERE NIC = ${NIC}`
    );

        _ = check dbClient->execute(`
        INSERT INTO Requests (requested_date, required_date, request_status, reason, Citizen_id)
        VALUES (${request.requested_date}, ${request.required_date},"Pending",${request.reason},${citizenID})`);

        return <http:Ok>{};
    }

    

    resource function put updateStatus/[string Request_id]() returns error|http:Ok {

        _ = check dbClient->execute(
        `UPDATE Requests SET request_status="Completed" WHERE request_id=${Request_id}`
    );

        return <http:Ok>{};
    }

}

function getAccessToken(string clientId,string clientSecret) returns string|error {
    string tokenEndpoint = "https://api.asgardeo.io/t/orgnization1/oauth2/token";


    string credentialsBase64 = (clientId + ":" + clientSecret).toBytes().toBase64();
    string payload = "grant_type=client_credentials";
    map<string> headers = {
        "Authorization": "Basic " + credentialsBase64,
        "Content-Type": "application/x-www-form-urlencoded"
    };

    http:Client tokenClient = check new (tokenEndpoint);
    http:Response tokenResponse = check tokenClient->post("", payload, headers);

    json responseJson = check tokenResponse.getJsonPayload();
    string accessToken = check responseJson.access_token;

    log:printInfo("Successfully retrieved the new access token.");

    return accessToken;
}

