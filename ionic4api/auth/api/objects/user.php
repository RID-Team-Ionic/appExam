<?php
// 'User' Object
class User {
    // Database connection
    private $conn;
    private $table_name = "users";

    // Object properties
    public $userid;
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
    
    // Check if given username exist in the database
    function userExists() {
        // Query to check if username exists
        $query = "SELECT * FROM " . $this->table_name . " WHERE userName = ? LIMIT 0,1 ";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        // htmlspecialchars แปลงตัวอักษรที่มีผลต่อ tag html ให้แสดงเป็นข้อความปกติ เช่น '&' เป็น '&'
        // strip_tags ลบแท็ก HTML และ PHP ออกจากข้อความสตริง
        $this->username=htmlspecialchars(strip_tags($this->username));

        // Bind given username value
        $stmt->bindParam(1, $this->username);

        // Execute the query
        $stmt->execute();

        // Get number of rows
        $num = $stmt->rowCount();

        // If username exists, assign values to object properties for easy access and use for php sessions
        if($num>0) {    
            // Get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Assign values to object properties
            $this->userid = $row['userID'];
            $this->fullname = $row['fullName'];
            $this->password = $row['password'];
            $this->email = $row['email'];

            // Return true because username exists in the database
            return true;
        }
        // Return false if username does not exist in the database
        return false;
    }

    // Update a user record
    public function update() {
        // If password needs to be updated
        $password_set=!empty($this->password) ? ", password = :password" : "";

        // If no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
            SET 
            fullName = :fullname,
            userName = :username,
            email = :email
            {$password_set}
            WHERE userID = :userid";

        // Prepare the query
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->fullname=htmlspecialchars(strip_tags($this->fullname));
        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->email=htmlspecialchars(strip_tags($this->email));

        // Bind the values from the form
        $stmt->bindParam(':fullname', $this->fullname);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);

        // Hash the password before saving to database
        if(!empty($this->password)) {
            $this->password=htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(':password', $password_hash);
        }

        // Unique ID of record to be edited
        $stmt->bindParam(':userid', $this->userid);

        // Execute the query
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>