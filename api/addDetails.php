<?php
// Create connection
include 'configFunction.php';

$objData = getPOSTData();

if(property_exists($objData, "id")){
	$id = $objData->id;
	$values = getQueryValue(true, $objData);
	$sql = "UPDATE $tableName SET $values WHERE id='$id'";
}else{
	$values = getQueryValue(false, $objData);
	$sql = "INSERT INTO $tableName $values";
}
/*echo $sql;*/
$result = mysqli_query($con, $sql);

if(!$result) {
	header_status(500);
}

mysqli_close($con);
?>