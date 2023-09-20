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


    resource function get checkAddress/[string NICnumber]/[string gsDivisionNumber]/[string houseNumber]/[string streetName]/[string areaPostOffice]/[string city]/[string district]() returns boolean|error {
   
         boolean iscorrectAddress=false;

         int adrress = check dbClient->queryRow( 
        `SELECT EXISTS (
    SELECT *
    FROM Citizen
    WHERE NIC = ${NICnumber} AND gs_division_number = ${gsDivisionNumber} AND house_number=${houseNumber} AND street_name=${streetName} AND  area_post_office=${areaPostOffice} AND city=${city} AND district=${district} );`
    );

         
    if(adrress == 0){
        iscorrectAddress = false;
    } else {
        iscorrectAddress = true;
    }
        // boolean isMatched = regex:matches(NICnumber, "^(([5-9]{1})([0-9]{1})([01356789]{1})([0-9]{6})([vVxX]))|(([12]{1})([0-9]{2})([01356789]{1})([0-9]{7}))$");
        return iscorrectAddress;
    }
}
