<?php 
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Required to encode json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// Database connection will be here
// Files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';
// Get database connection
$database = new Database();
$db = $database->getConnection();
 
// Instantiate product object
$user = new User($db);

// Retrieve given JWT
// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Get JWT
// === Test ===
// $jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsidXNlcmlkIjoiNyIsImZ1bGxuYW1lIjoiUG9uZ3Nha29ybiBQYW5sdWNrIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG90bWFpbC5jb20ifX0.zpJVL4qRjleWPUYuaoW6N_JupO9S3opqPVAGEtd_CdQ';

$jwt = isset($data->jwt) ? $data->jwt : "";

// Decode JWT here
// If JWT is not empty
if($jwt) {
    // If decoded succeed, show user details
    try {
        // Decode JWT
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        // Set user property values here
        $decoded = $decoded->data;
        $user->userid = $decoded->userid;
        $user->fullname = $data->fullname;
        $user->username = $data->username;
        $user->password = $data->password;
        $user->email = $data->email;

        // Update user will be here
        // Create the product
        if($user->update()) {
            // Regenerate JWT will be here
            // We need to re-generate JWT because user details might be different
            $token = array(
                'iss' => $iss,
                'aud' => $aud,
                'iat' => $iat,
                'nbf' => $nbf,
                'data' => array(
                    'userid' => $user->userid,
                    'fullname' => $user->fullname,
                    'username' => $user->username,
                    'email' => $user->email
                )
            );
            $jwt = JWT::encode($token, $key);

            // Set response code
            // http_response_code(200);

            // Response in json format
            echo json_encode(
                array(
                    'message' => 'User was updated.',
                    'jwt' => $jwt
                )
            );
        } else { // Message if unable to update user
            // Set response code
            // http_response_code(401);

            // Show error message
            echo json_encode(array('message' => 'Unable to update user.'));
        }
    } catch (Exception $e) { // If decode fails, it means jwt is invalid
        // Set response code
        // http_response_code(401);

        // Show error message
        echo json_encode(array(
            'message' => 'Access denied.',
            'error' => $e->getMessage()
        ));
    }
} else { // Show error message if JWT is empty
    // Set response code
    // http_response_code(401);

    // Tell the user access denied
    echo json_encode(
        array(
            'message' => 'Access denied.'
        )
    );
}
?>