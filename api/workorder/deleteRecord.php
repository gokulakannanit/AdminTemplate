<?php
// Create connection
include '../configFunction.php';
include 'config.php';

$connQuery = '';
$objData = getPOSTData();

$connQuery1 = " WHERE id=".$objData->id;
$connQuery2 = " WHERE workorderId=".$objData->id;

$result = mysqli_query($con,"DELETE FROM $tableName".$connQuery1) or die(mysql_errno()."error in query execution");

$result1 = mysqli_query($con,"DELETE FROM spare".$connQuery2) or die(mysql_errno()."error in query execution");

mysqli_close($con);
?>