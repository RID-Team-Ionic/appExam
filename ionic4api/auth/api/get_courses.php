<?php

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

// $user->create()

// if(  ) {
//     http_response_code(200);
//     echo json_encode(array("status" => "ok", "message" => "User was created."));
// } else {
//     http_response_code(400);
//     echo json_encode(array("status" => "error","message" => "Unable to create user."));
// }

?>