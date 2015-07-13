<?php
error_reporting(0);

include 'configFunction.php';

$connQuery = '';

if(isset($_REQUEST['vehicleId'])){
	$connQuery = " WHERE vehicleId=".$_REQUEST['vehicleId'];
}
$query  = "SELECT * FROM $tableName".$connQuery;
$result = mysqli_query($con, $query);

/*echo $query;*/

$json_response  = array();
$final_response = array();


while ($row = mysqli_fetch_assoc($result)) {
    array_push($json_response, $row);
}

if($result) {
	$status = 200;
} else {
	$status = 500;
}


$final_response = array('status' => $status, 'data' => $json_response );

echo json_encode($json_response);

mysqli_close($con);
?>