<?php

include 'configFunction.php';

$connQuery = '';

if(isset($_REQUEST['vehicleId'])){
	$connQuery = " WHERE vehicleId=".$_REQUEST['vehicleId'];
}
$query  = "SELECT * FROM $tableName".$connQuery;
$result = mysqli_query($con, $query) or die(mysql_errno()."error in query execution");

/*echo $query;*/

$json_response  = array();

while ($row = mysqli_fetch_assoc($result)) {
    array_push($json_response, $row);
}


echo json_encode($json_response);

mysqli_close($con);
?>