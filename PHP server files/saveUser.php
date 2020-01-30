
<?php
$servername = "213.190.6.43";
$username = "u293721445_user";
$password = "password";
$dbname = "u293721445_menus";

 
 // Importing DBConfig.php file.
 
 // Creating connection.
 $con = mysqli_connect($servername,$username,$password,$dbname);
 
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate product name from JSON $obj array and store into $product_name.
 $token = $obj['token'];
 
 // Populate product number from JSON $obj array and store into $product_number.

 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "insert into users ( token) values ( $token)";
 
if (mysqli_query($con, $Sql_Query)){
    
 
 // If the record inserted successfully then show the message as response. 
$MSG = 'Product Successfully Inserted into MySQL Database' ;
 
 // Converting the message into JSON format.
 $json = json_encode($MSG);
 
 // Echo the message on screen.
 // We would also show this message on our app.
    echo $json;
 
 }
 else{
    
 
 echo json_encode($con);
 
 }
 mysqli_close($con);
 
?>
