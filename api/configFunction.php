<?php
error_reporting(0);

header('Content-Type: application/json');
include 'header.php';
$con = mysqli_connect("localhost","root","","logistics");

// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}else{
	return $con;
}

function getPOSTData(){
	$data = file_get_contents("php://input");
	return json_decode($data);
}

function removeValue($objData, $excludeValue = array()){
	$newArr = array();
	foreach($objData as $key => $value) {
		$isExist = false;
		foreach ($excludeValue as $innerKey) {
			if($innerKey == $key){
				$isExist = true;
			}
		}
		if(!$isExist){
			$newArr[$key] = $value;
		}
	}
	return $newArr;
}

function getQueryValue($isUpdate, $objData, $excludeValue = array()){
	$valuePair = "";
	$newArr = array();

	if(count($excludeValue)>0){
		$newArr = removeValue($objData, $excludeValue);
	}else{
		$newArr = $objData;
	}
	if($isUpdate){
		foreach($newArr as $key => $value) {
			if($key !== 'id'){
				if($valuePair !== ""){
					$valuePair .= ", ";
				}				
				$valuePair .= "$key = '$value'";
			}
		}
	}else{
		$keys = "";
		$values = "";
		foreach($newArr as $key => $value) {
			if($key !== 'id'){
				if($keys !== ""){
					$keys .= ", ";
				}
				if($values !== ""){
					$values .= ", ";
				}
				$values .= "'$value'";
				$keys .= "$key";
			}    
		}
		$valuePair = "($keys) VALUES ($values)";		
	}
	return $valuePair;
}
?>