<?php
// Create connection
include 'config.php';
include 'configFunction.php';

$objData = getPOSTData();
$exclude = array("spareList");

if(property_exists($objData, "id")){
	$id = $objData->id;
	$values = getQueryValue(true, $objData, $exclude);
	$sql = "UPDATE $tableName SET $values WHERE id='$id'";
	$connQuery = " WHERE workorderId='$id'";
	$result1 = mysqli_query($con,"DELETE FROM spare".$connQuery2) or die(mysql_errno()."error in query execution");
}else{
	$values = getQueryValue(false, $objData, $exclude);
	$sql = "INSERT INTO $tableName $values";
}
/*echo $sql;*/
$result = mysqli_query($con, $sql) or die(mysql_errno()."error in query execution");

if(!$id){
	$id = mysql_insert_id();
}

foreach ($objData->spareList as $value) {
	$value['workorderId'] = $id;
	$values = getQueryValue(true, $objData);
	$sql = "INSERT INTO spare $values";
	$result = mysqli_query($con, $sql) or die(mysql_errno()."error in query execution");
}

mysqli_close($con);
?>