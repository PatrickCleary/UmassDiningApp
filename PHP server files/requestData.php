<?php
error_reporting( E_ERROR | E_PARSE | E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_COMPILE_WARNING );
$servername = "213.190.6.43";
$username = "u293721445_user";
$password = "password";
$dbname = "u293721445_menus";



 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate product name from JSON $obj array and store into $product_name.
 $query = $obj['query'];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}




$sql = $query;
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    
    // output data of each row
    $myObj;
    echo '[';
    $first = 0;
    while($row = $result->fetch_assoc()) {
        if($first !=0){echo ',';}
        $myObj->food = $row["food"];
        $myObj->hall = $row["hall"];
        $myObj->meal = $row["meal"];
        $myObj->category = $row["category"];
        $myObj->numAppearances = $row["numAppearances"];
        
        echo json_encode($myObj);
        $first++;        
        
    }
  
    echo ']';
} else {
    echo'[]';
}
$conn->close();
?>