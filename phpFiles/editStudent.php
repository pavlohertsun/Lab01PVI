<?php
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];
$id = $_POST["id"];
if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $connection = mysqli_connect("localhost", "root", "", "MyDataBase_PVI");
    if ($connection == false) {
        die("ERROR: Cannot connect the data base"
            . mysqli_connect_error());
    }
    $statement = $connection->prepare("UPDATE Students SET name = ? , sgroup = ?, gender = ?, birthday = ? WHERE id = ?");
    $statement->bind_param("ssssi",$name,$group, $gender, $birthday, $id);
    $statement->execute();
    $connection->close();
}
echo "Editing of student with id ".$id." is successful. New fields of this student : ".$name . " " . $group . " " . $gender . " " . $birthday;
