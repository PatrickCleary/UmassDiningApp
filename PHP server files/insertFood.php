
<?php
 
 // Importing DBConfig.php file.
 include 'DBConfig.php';
 
 // Creating connection.
 $con = mysqli_connect($host,$username,$password,$databasename);
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
 // Populate product name from JSON $obj array and store into $product_name.
 $food = $obj['food'];
 
 // Populate product number from JSON $obj array and store into $product_number.
 $hall = $obj['hall'];
 
 // Populate product details from JSON $obj array and store into $product_details.
 $meal = $obj['meal'];
 
 $category = $obj['category'];
 
 // Creating SQL query and insert the record into MySQL database table.
 $Sql_Query = "insert into menu (food, hall, meal, category) values ($food, $hall, $meal, $category)";
 
 
 if(mysqli_query($con,$Sql_Query)){
 
 // If the record inserted successfully then show the message as response. 
 $MSG = 'Product Successfully Inserted into MySQL Database' ;
 
 // Converting the message into JSON format.
 $json = json_encode($MSG);
 
 // Echo the message on screen.
 // We would also show this message on our app.
 echo $json ;
 
 }
 else{
 
 echo "Something Went Wrong + $food + $hall + $meal + $category";
 
 }
 mysqli_close($con);
 
?>
