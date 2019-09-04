<?php 
// Required headers
header("Access-Control-Allow-Origin: http://localhost:8100");
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

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);
// === Test ===
// $data = new class{};
// $data->password = '88888888'; 

$data->password = $data['password'];

// === Test ===
// $user->username = 'pure';

// Set product property values
$user->username = $data['username'];
$user_exists = $user->userExists();

// Files for jwt will be here
// Generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// Generate jwt will be here
// Check if username exists and if password is correct
// password_verify ( string $password , string $hash )
if($user_exists && password_verify($data->password, $user->password)) {
    $token = array(
        // Payload or JWT Claim = เก็บข้อมูลที่ต้องการส่งไปใน Token, Registered claim
        // – iss (issuer) : เว็บหรือบริษัทเจ้าของ token
        // – sub (subject) : subject ของ token
        // – aud (audience) : ระบุผู้รับ token
        // – exp (expiration time) : เวลาหมดอายุของ token
        // – nbf (not before) : ระบุเวลาที่จะไม่ยอมรับ JWT สำหรับการประมวลผล
        // – iat (issued at) : ใช้เก็บเวลาที่ token นี้เกิดปัญหา
        // – jti (JWT id) : เอาไว้เก็บไอดีของ JWT แต่ละตัวนะครับ

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

    // Set response code
    // http_respone_code(200);

    // Generate jwt
    $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(
            'message' => 'Successful login.',
            'jwt' => $jwt
        )
    );
} else { // Login Failed
    // Set response code
    // http_response_code(401);

    // Tell the user login failed
    echo json_encode(
        array(
            'message' => 'Login failed.'
        )
    );
}
?>