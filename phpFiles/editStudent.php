<?php
$name = $_POST["name"];
$group = $_POST["group"];
$gender = $_POST["gender"];
$birthday = $_POST["birthday"];
$id = $_POST["id"];
echo "Editing student with id ".$id.".New fields of this student : ".$name . " " . $group . " " . $gender . " " . $birthday;