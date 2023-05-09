<?php
$connection = mysqli_connect("localhost", "root", "", "MyDataBase_PVI");

if(mysqli_connect_errno()) {
    die("ERROR: Cannot connect to the database: " . mysqli_connect_error());
}

$statement = $connection->prepare("SELECT * FROM Students");
$statement->execute();
$result = $statement->get_result()->fetch_all(MYSQLI_ASSOC);

if($statement->error) {
    die("ERROR: " . $statement->error);
}
$connection->close();
echo json_encode($result);
