<?php
$connection = mysqli_connect("localhost", "root", "", "MyDataBase_PVI");

if($connection == false) {
    die("ERROR: Cannot connect the data base"
        . mysqli_connect_error());
}
