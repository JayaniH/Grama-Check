import ballerina/http;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new (
    host = HOST, user = USER, password = PASSWORD, port = PORT, database = "GramaCheck"
);

# A service representing a network-accessible API
# bound to port `9090`.
service /AddressCheck on new http:Listener(9090) {

    resource function get checkAddress/[string gsDivisionNumber]/[string houseNumber]/[string streetName]/[string areaPostOffice]/[string city]/[string district]/[string userID]() returns boolean|error {

        boolean iscorrectAddress = false;

        int adrress = check dbClient->queryRow(
        `SELECT EXISTS (
    SELECT *
    FROM Citizen
    WHERE gs_division_number = ${gsDivisionNumber} AND house_number=${houseNumber} AND street_name=${streetName} AND  area_post_office=${areaPostOffice} AND city=${city} AND district=${district} AND userID=${userID});`
    );

        if (adrress == 0) {
            iscorrectAddress = false;
        } else {
            iscorrectAddress = true;
        }
        return iscorrectAddress;
    }
}
