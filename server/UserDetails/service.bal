import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
// import ballerina/sql;

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
    string full_name;
    string house_number;
    string street_name;
    string area_post_office;
    string  city;
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
    int Citizen_id;
    int request_id;
    time:Date requested_date;
    time:Date required_date;
    string request_status;
|};

public type CombinedResult record {
    userDetails user;
    requestDetails request;
};

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
    string full_name;
    string address;
    string gs_division_number;
    string sex;
    boolean whetherSriLankan;
    string religion;
    string occupation;
    string NIC;
    string district;
    time:Date DOB;
    time:Date requested_date;
    time:Date required_date;
    string request_status;
  
|};

// type CombinedResult record {
    
// };

# A service representing a network-accessible API
# bound to port `9090`.
service /userDetails on new http:Listener(9090) {

//to display user details for each user
resource function get userData/[string NIC]() returns error|CombinedResult {


    userDetails user = check dbClient->queryRow(
        `SELECT * FROM Citizen WHERE NIC = ${NIC}`
    );

    int citizenID = user.Citizen_id;
    requestDetails request = check dbClient->queryRow(
         `SELECT * FROM Requests WHERE Citizen_id = ${citizenID}`
    );

     CombinedResult Result = {
        user: user,
        request: request
    };

    return Result;
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

// resource function post userRequestDetails/[string NIC]() returns error|CombinedResult {

//     string citizen = check dbClient->queryRow(
//         `SELECT Citizen_id FROM Citizen WHERE NIC = ${NIC}`
//     );
//     // Parse the request body as JSON to get the dictionary
//         map<json> requestDetails = check req.getJsonPayload();


//     // if(citizen == " "){
//     //     _ = check dbClient->execute(`
//     //      INSERT INTO Employees (employee_id, first_name, last_name, email, phone,
//     //                            hire_date, manager_id, job_title)
//     //     VALUES (${emp.employee_id}, ${emp.first_name}, ${emp.last_name},  
//     //             ${emp.email}, ${emp.phone}, ${emp.hire_date}, ${emp.manager_id},
//     //             ${emp.job_title})`);
//     // }


//     userDetails user = check dbClient->queryRow(
//         `SELECT * FROM Citizen WHERE NIC = ${NIC}`
//     );

//     int citizenID = user.Citizen_id;
//     requestDetails request = check dbClient->queryRow(
//          `SELECT * FROM Requests WHERE Citizen_id = ${citizenID}`
//     );

//      CombinedResult Result = {
//         user: user,
//         request: request
//     };

//     return Result;
// }

}



