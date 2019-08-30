<?php 
// Response => Frontend

// Required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection will be here
// Files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';
// Get database connection
$database = new Database();
$db = $database->getConnection();
 
// Instantiate product object
$user = new User($db);

// Submitted data will be here
// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Set posted data
$user->fullname = $data['fullname'];
$user->username = $data['username'];
$user->password = $data['password'];
$user->email = $data['email'];

// Create the user
if( 
    !empty($user->fullname) &&
    !empty($user->username) &&
    !empty($user->password) &&
    !empty($user->email) && 
    $user->create()
) {
    // Set response code
    http_response_code(200);

    // Display message: user was created
    echo json_encode(array("status" => "ok", "message" => "User was created."));
}
// message if unable to create user
else {
    // Set response code
    http_response_code(400);

    // Display message: unable to create user
    echo json_encode(array("status" => "error","message" => "Unable to create user."));
}
?>