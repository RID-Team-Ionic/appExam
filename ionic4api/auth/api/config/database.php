<?php 
// *** File used for connecting to the database. ***
// Used to get MySQL database connection
class Database {
    // Specify your own database credentials 
    private $host = "127.0.0.1";
    private $db_name = "ionic4";
    private $username = "root";
    private $password = "";

    public $conn;

    // Get the database connection
    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}   
// DuckDuck : https://bit.ly/2G6sQKR
?>