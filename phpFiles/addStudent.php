<?php
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $connection = mysqli_connect("localhost", "root", "", "MyDataBase_PVI");
    if ($connection == false) {
        die("ERROR: Cannot connect the data base"
            . mysqli_connect_error());
    }
    $statement = $connection->prepare("INSERT INTO Students VALUES (null, ?, ?, ?, ?, 1)");
    $statement->bind_param("ssss", $name, $group, $gender, $birthday);
    $statement->execute();
    echo $connection->insert_id;
    $connection->close();
}


