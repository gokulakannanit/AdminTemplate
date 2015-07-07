<?php
// Create connection
include 'config.php';
include '../configFunction.php';

$subTableName = 'spare';
$subTableName1 = 'labour';

$objData = getPOSTData();
$exclude = array("spareList", "labourList");

if(property_exists($objData, "id")){
	$id = $objData->id;
	$values = getQueryValue(true, $objData, $exclude);
	$sql = "UPDATE $tableName SET $values WHERE id='$id'";

	$connQuery = " WHERE workorderId='$id'";
	$result1 = mysqli_query($con,"DELETE FROM spare".$connQuery) or die(mysql_errno()."error in query execution");

	$connQuery1 = " WHERE workorderId='$id'";
	$result2 = mysqli_query($con,"DELETE FROM labour".$connQuery1) or die(mysql_errno()."error in query execution");

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

foreach ($objData->labourList as $value) {
	$value = get_object_vars($value);
	
	$value['workorderId']= $id;	
	$values = getQueryValue(false, $value);	
	
	$sql = "INSERT INTO $subTableName1 $values";

	$result = mysqli_query($con, $sql) or die(mysql_errno()."error in query execution");
}

mysqli_close($con);
?>