<?php
$id = $_POST["id"];
$connection = mysqli_connect("localhost", "root", "", "MyDataBase_PVI");
if ($connection == false) {
    die("ERROR: Cannot connect the data base"
        . mysqli_connect_error());
}
$statement = $connection->prepare("DELETE FROM Students WHERE id = ?");
$statement->bind_param("i", $id);
$statement->execute();
$connection->close();
echo "deleting student with id ".$id;