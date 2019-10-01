<?php 
// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Required to decode jwt
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Get JWT 
// === Test ===
// $jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsidXNlcmlkIjoiOSIsImZ1bGxuYW1lIjoicG9uZ3Nha29ybiBwYW5sdWNrIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG90bWFpbC5jb20ifX0.2YJcISEwHQhrLpouPxRA8pI_rMehNP13wcfzvAF0VWI';

$jwt = isset($data->jwt) ? $data->jwt : '';

// Decode JWT here
// If JWT is not empty
if($jwt) {
    // If decode succeed, show user details
    try {
        // Decode JWT
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        // Set response code
        // http_response_code(200);

        // Show user details 
        echo json_encode(array(
            'message' => 'Access granted.',
            'data' => $decoded->data
        ));
    } catch (Exception $e) { // If decode fails, it means jwt is invalid
        // Set response code
        // http_response_code(401);
        
        // Tell access denied & show error message
        echo json_encode(array(
            'message' => 'Access denied.',
            'error' => $e->getMessage()
        ));
    }
} else { // Show error message if JWT is empty
    // Set response code
    // http_response_code(401);

    // Tell the user access denied
    echo json_encode(array(
        'message' => 'Access denied.'
    ));
}
?>