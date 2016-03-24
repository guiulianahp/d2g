<?php
header('Content-type: application/json');
$servername = "localhost";
$username = "root";
$password = "linda";
$dbname = "scf";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data

$sql = "INSERT INTO scf.scf_prospecto (nombre, telefono, correo)
		VALUES ('$_POST[name]', '$_POST[phone_number]', '$_POST[email]')";


if ($conn->query($sql) === TRUE) {
    $data['status'] = 'success';
    $data['message'] = 'Correcto';
	
} else {
    $data['status'] = 'error';
    $data['message'] = 'INcorrecto';
	
}

$conn->close();	
echo json_encode($data);
?>