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
        $myObj->category = $row["category"];
        $myObj->wb = $row["wb"];
        $myObj->wl = $row["wl"];
        $myObj->wd = $row["wd"];
        $myObj->wln = $row["wln"];
        $myObj->wgg = $row["wgg"];
        $myObj->hb = $row["hb"];
        $myObj->hl = $row["hl"];
        $myObj->hd = $row["hd"];
        $myObj->hln = $row["hln"];
        $myObj->hgg = $row["hgg"];
        $myObj->bb = $row["bb"];
        $myObj->bl = $row["bl"];
        $myObj->bd = $row["bd"];
        $myObj->bln = $row["bln"];
        $myObj->bgg = $row["bgg"];
        $myObj->fb = $row["fb"];
        $myObj->fl = $row["fl"];
        $myObj->fd = $row["fd"];
        $myObj->fln = $row["fln"];
        $myObj->fgg = $row["fgg"];
        
        echo json_encode($myObj);
        $first++;        
        
    }
  
    echo ']';
} else {
    echo'[]';
}
$conn->close();
?>