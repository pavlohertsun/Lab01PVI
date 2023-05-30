<?php
$id = $_POST["id"];

$host = 'localhost';
$dbname = 'MyDataBase_PVI';
$username = 'root';
$password = '';
try {
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $statement = $connection->prepare("DELETE FROM Students WHERE id = :id");
    $statement->bindParam(":id", $id);
    $statement->execute();
    $connection = null;
} catch (PDOException $e) {
    echo 'Помилка підключення до бази даних: ' . $e->getMessage();
}
echo "deleting student with id ".$id;