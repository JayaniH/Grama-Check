import ballerina/http;
import ballerina/time;

// public type UserData record {|
//     readonly string iso_code;
//     string country;
//     decimal cases;
//     decimal deaths;
//     decimal recovered;
//     decimal active;
// |};

public type userDetails record {|
    int user_id?;
    string first_name;
    string last_name;
    string address;
    string sex;
    string age;
    boolean whetherSriLankan;
    string religion;
    string occupation;
    string NIC;
    time:Date hire_date;
  
|};

// public final table<UserData> key(iso_code) userDataTable = table [
//     {iso_code: "AFG", country: "Afghanistan", cases: 159303, deaths: 7386, recovered: 146084, active: 5833}
//     // {iso_code: "SL", country: "Sri Lanka", cases: 598536, deaths: 15243, recovered: 568637, active: 14656},
//     // {iso_code: "US", country: "USA", cases: 69808350, deaths: 880976, recovered: 43892277, active: 25035097}
// ];

type ErrorDetails record {
    string message;
    string details;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

# A service representing a network-accessible API
# bound to port `9090`.
service /userDetails on new http:Listener(9090) {


    // resource function get userData/[string username]() returns userDetails|UserNotFound|error {
    //     // userDetails? user is(){

    //     }
      
    // }
}


