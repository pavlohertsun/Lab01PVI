<?php
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];

$host = 'localhost';
$dbname = 'MyDataBase_PVI';
$username = 'root';
$password = '';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $statement = $connection->prepare("INSERT INTO Students VALUES (null, :name, :group, :gender, :birthday, 1)");
        $statement->bindParam(":name", $name);
        $statement->bindParam(":group", $group);
        $statement->bindParam(":gender", $gender);
        $statement->bindParam(":birthday", $birthday);
        $statement->execute();
        echo $connection->lastInsertId();
        $connection = null;
    } catch (PDOException $e) {
        echo 'Помилка підключення до бази даних: ' . $e->getMessage();
    }
}


