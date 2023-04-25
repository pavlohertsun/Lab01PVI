<?php
//var_dump($_SERVER);
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];
echo "Added new student with fields: ".$name." ".$group." ".$gender." ".$birthday;