<?php
// 'User' Object
class User {
    // Database connection
    private $conn;
    private $table_name = "users";

    // Object properties
    public $id;
    public $fullname;
    public $username;
    public $password;
    public $email;

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
        // Set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
   
    // Create new user record
    function create() {
        // Duplicate check ?
        // Select query
        $query_0 = "SELECT count(userName) FROM " . $this->table_name . " WHERE userName = '" . $this->username . "'" ;
        $stmt_0 = $this->conn->prepare($query_0);
        $stmt_0->execute();
        $row_count = $stmt_0->fetchColumn();
        if ($row_count >= 1) { // Username is duplicate !    
            echo json_encode(array("status" => "error", "message" => "Username is duplicate."));
            exit;
        } else {
            // Insert query
            $query = "INSERT INTO " . $this->table_name . "
            SET
            fullName = :fullname,
            userName = :username,
            email = :email,
            password = :password";

            // Prepare the query
            $stmt = $this->conn->prepare($query);

            // Sanitize
            $this->fullname=htmlspecialchars(strip_tags($this->fullname));
            $this->username=htmlspecialchars(strip_tags($this->username));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->email=htmlspecialchars(strip_tags($this->email));

            // Bind the values
            $stmt->bindParam(':fullname', $this->fullname);
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':email', $this->email);

            // Hash the password before saving to database
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);

            // Execute the query, also check if query was successful
            if($stmt->execute()){
                return true; // Tell to create_user page, it added
            }
            return false; // Tell to create_user page, it can't add
        }
    }
}
?>