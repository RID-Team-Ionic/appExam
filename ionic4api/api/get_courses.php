<?php

include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = " SELECT * FROM lesson ";
$stmt = $this->conn->prepare($query_0);
$stmt->execute();

// if(  ) {
//     http_response_code(200);
//     echo json_encode(array("status" => "ok", "message" => "User was created."));
// } else {
//     http_response_code(400);
//     echo json_encode(array("status" => "error","message" => "Unable to create user."));
// }

?>