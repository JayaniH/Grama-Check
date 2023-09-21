import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
// import ballerina/sql;
// import ballerina/os;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database="GramaCheck"
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

public type requestDetails record {|
    // int Citizen_id;
    time:Date requested_date;
    time:Date required_date;
    // string request_status;
    string reason;
|};

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
    int Request_id;
    time:Date requested_date;
    time:Date required_date;
    string request_status;
  
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
        `SELECT Citizen.*,Request.Request_id,Requests.requested_date,Requests.required_date, Requests.request_status
        FROM Citizen 
        JOIN Requests ON Citizen.Citizen_id = Requests.Citizen_id 
         WHERE NIC = ${NIC}`
    );

    // http:Client policeCheckClient = check new (os:getEnv("PoliceCheck_URL"));
    // // Sends a `GET` request to the "/criminalData"
    // boolean|http:ClientError isCriminal = check policeCheckClient->/criminalData/[NIC];



    // http:Client addressCheckClient = check new (os:getEnv("AdressCheck_URL"));
    // // Sends a `GET` request to the "/validateNIC"
    // boolean|http:ClientError isaddressVerified = check addressCheckClient->/checkAddress/[gsDivisionNumber]/[houseNumber]/[streetName]/[areaPostOffice]/[city]/[district]/[userID];


        
    // http:Client IdentityCheckClient = check new (os:getEnv("IdentityCheck_URL"));
    // // Sends a `GET` request to the "/criminalData"
    // boolean|http:ClientError isIdentityVerified = check IdentityCheckClient->/validateNIC/[NIC]/[gsDivisionNumber]/[userID];

    http:Client policeCheckClient = check new ("http://police-check-service-dew-3706729527:9090/policeCheck");
    // Sends a `GET` request to the "/criminalData"
    boolean|http:ClientError isCriminal = check policeCheckClient->/criminalData/[NIC];



    http:Client addressCheckClient = check new ("http://address-check-service-tzl-2989585241:9090/AddressCheck");
    // Sends a `GET` request to the "/validateNIC"
    boolean|http:ClientError isaddressVerified = check addressCheckClient->/checkAddress/[gsDivisionNumber]/[houseNumber]/[streetName]/[areaPostOffice]/[city]/[district]/[userID];


        
    http:Client IdentityCheckClient = check new ("http://identity-check-service-ogo-588361154:9090/IdentityCheck");
    // Sends a `GET` request to the "/criminalData"
    boolean|http:ClientError isIdentityVerified = check IdentityCheckClient->/validateNIC/[NIC]/[gsDivisionNumber]/[userID];


   
    CombinedUserData userData = {
        user : user,
        isaddressVerified: check isIdentityVerified, 
        isIdentityVerified: check isaddressVerified, 
        isCriminal: check isCriminal};
      

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

    string citizenID = check dbClient->queryRow(
        `SELECT Citizen_id FROM Citizen WHERE NIC = ${NIC}`
    );

    time:Date requestedDate = request.requested_date;
     time:Date requireddDate = request.required_date;
     string reason = request.reason;


     _ = check dbClient->execute(`
         INSERT INTO Requests (requested_date, required_date, request_status, reason, Citizen_id)
        VALUES (${requestedDate}, ${requireddDate},"Pending", ${reason},${citizenID})`);
  
    

    return <http:Ok>{};
}

resource function put updateStatus/[string Request_id]() returns error|http:Ok {

    _ = check dbClient->execute(
        `UPDATE Requests SET request_status="Completed" WHERE request_id=${Request_id}`
    );

  
    

    return <http:Ok>{};
}

}



