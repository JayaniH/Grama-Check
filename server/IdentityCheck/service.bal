import ballerina/http;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/regex;

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


service /IdentityCheck on new http:Listener(9090) {

    resource function get validateNIC/[string NICnumber]() returns boolean {

        boolean isMatched = regex:matches(NICnumber, "^(([5-9]{1})([0-9]{1})([01356789]{1})([0-9]{6})([vVxX]))|(([12]{1})([0-9]{2})([01356789]{1})([0-9]{7}))$");
        return isMatched;
    }
}


function matches(string input, string regexPattern) returns boolean {
    boolean isMatched = regex:matches(input, regexPattern);
    return isMatched;
}


