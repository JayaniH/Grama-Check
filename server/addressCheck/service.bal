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


# A service representing a network-accessible API
# bound to port `9090`.
service /AddressCheck on new http:Listener(9090) {


    resource function get checkAddress/[string NICnumber]/[string citizenDivisionNumber]/[string gsDivisionNumber]() returns boolean|error {
   
         boolean iscorrectAddress=false;

         int validation = check dbClient->queryRow( 
        `SELECT EXISTS (
    SELECT *
    FROM Citizen
    INNER JOIN GramaSewaka ON Citizen.GS_id = GramaSewaka.GS_id
    WHERE Citizen.NIC = ${NICnumber} AND Citizen.gs_division_number = ${citizenDivisionNumber} AND GramaSewaka.gs_division_number = ${gsDivisionNumber});`
    );

         
    if(validation == 0){
        iscorrectAddress = false;
    } else {
        iscorrectAddress = true;
    }
        // boolean isMatched = regex:matches(NICnumber, "^(([5-9]{1})([0-9]{1})([01356789]{1})([0-9]{6})([vVxX]))|(([12]{1})([0-9]{2})([01356789]{1})([0-9]{7}))$");
        return iscorrectAddress;
    }
}
