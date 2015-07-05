<?php
// Create connection
include 'config.php';
include '../configFunction.php';

$subTableName = 'spare';

$objData = getPOSTData();
$exclude = array("spareList");

if(property_exists($objData, "id")){
	$id = $objData->id;
	$values = getQueryValue(true, $objData, $exclude);
	$sql = "UPDATE $tableName SET $values WHERE id='$id'";
	$connQuery = " WHERE workorderId='$id'";
	$result1 = mysqli_query($con,"DELETE FROM spare".$connQuery) or die(mysql_errno()."error in query execution");
}else{
	$values = getQueryValue(false, $objData, $exclude);	
	$sql = "INSERT INTO $tableName $values";
}
/*echo $sql;*/
$result = mysqli_query($con, $sql) or die(mysql_errno()."error in query execution");

if(!isset($id)){
	$id = mysqli_insert_id($con);
}
foreach ($objData->spareList as $value) {
	$value = get_object_vars($value);
	
	$value['workorderId']= $id;	
	$values = getQueryValue(false, $value);	
	
	$sql = "INSERT INTO $subTableName $values";

	$result = mysqli_query($con, $sql) or die(mysql_errno()."error in query execution");
}

mysqli_close($con);
?>