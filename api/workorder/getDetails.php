<?php
include '../configFunction.php';
include 'config.php';

function getSpare($con, $id){
	$inner_query  = "SELECT * FROM spare WHERE workorderId=".$id;
	$inner_result = mysqli_query($con, $inner_query) or die(mysql_errno()."error in query execution");
	$spareList = array();
	while ($inner_row = mysqli_fetch_assoc($inner_result)){
		array_push($spareList, $inner_row);
	}
	return $spareList;
}

$query  = "SELECT * FROM $tableName";
$result = mysqli_query($con, $query) or die(mysql_errno()."error in query execution");

/*echo $query;*/

$json_response  = array();

while ($row = mysqli_fetch_assoc($result)) {
	$row['spareList'] = getSpare($con, $row['id']);
    array_push($json_response, $row);
}


echo json_encode($json_response);

mysqli_close($con);
