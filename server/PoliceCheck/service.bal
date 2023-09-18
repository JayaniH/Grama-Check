import ballerina/http;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database="GramaCheck"
);


type criminalRecord record {
    string criminal_id;
	string Full_Name ;
	string NIC;
    string incident;
};

# A service representing a network-accessible API
# bound to port `9090`.
service /policeCheck on new http:Listener(9090) {

    resource function get criminalData/[string NIC]() returns boolean|error {
        boolean isCriminal=false;

         int crime = check dbClient->queryRow( 
        `SELECT EXISTS (SELECT * FROM CriminalRecords WHERE NIC = ${NIC})`
    );

    
    if(crime == 0){
        isCriminal = false;
    } else {
        isCriminal = true;
    }

    return isCriminal;
        
    }
}
