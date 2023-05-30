<?php
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];
$id = $_POST["id"];

$host = 'localhost';
$dbname = 'MyDataBase_PVI';
$username = 'root';
$password = '';

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    try {
        $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $statement = $connection->prepare("UPDATE Students SET name = :name , sgroup = :group, gender = :gender, birthday = :birthday WHERE id = :id");
        $statement->bindParam(":name", $name);
        $statement->bindParam(":group", $group);
        $statement->bindParam(":gender", $gender);
        $statement->bindParam(":birthday", $birthday);
        $statement->bindParam(":id", $id);
        $statement->execute();
        $connection = null;
    } catch (PDOException $e) {
        echo 'Помилка підключення до бази даних: ' . $e->getMessage();
    }
}
echo "Editing of student with id ".$id." is successful. New fields of this student : ".$name . " " . $group . " " . $gender . " " . $birthday;
