<?php
// Create connection
include 'config.php';
include '../configFunction.php';

$connQuery = '';

if(isset($_REQUEST['vehicleId'])){
	$connQuery = " WHERE vehicleId=".$_REQUEST['vehicleId'];
}

$query  = "SELECT * FROM $tableName".$connQuery." ORDER BY entrieDate DESC LIMIT 0,1";
$result = mysqli_query($con, $query);

$num_rows = mysqli_num_rows($result);

$query1  = "SELECT * FROM vehiclelist WHERE id=".$_REQUEST['vehicleId'];

if($num_rows <= 0) {
	$result = mysqli_query($con, $query1);
}

// echo $query;

$json_response  = array();

while ($row = mysqli_fetch_assoc($result)) {
    array_push($json_response, $row);
}

if(!$result) {
	header_status(500);
}

echo json_encode($json_response);

mysqli_close($con);

?>