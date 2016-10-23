/**
 * Created by Manster on 8/2/16.
 */

function UserInterface() {
    var SERVER_PATH = SERVER_CONFIGURATION().getServerConfig().Path;

    var User_Login = SERVER_PATH + 'json/login.json';

    return {
        User_Login: User_Login
    }
}