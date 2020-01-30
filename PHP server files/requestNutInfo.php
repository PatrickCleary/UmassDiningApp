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
        $myObj->Corn = $row["Corn"];
		$myObj->Milk = $row["Milk"];
		$myObj->Eggs = $row["Eggs"];
		$myObj->Gluten = $row["Gluten"];
		$myObj->Soy = $row["Soy"];
		$myObj->Sesame = $row["Sesame"];
		$myObj->TreeNuts = $row["TreeNuts"];
        $myObj->Fish = $row["Fish"];
        $myObj->Shellfish = $row["Shellfish"];
        $myObj->Peanuts = $row["Peanuts"];
        $myObj->Vegetarian= $row["Vegetarian"];
        $myObj->Loc = $row["Loc"];
        $myObj->Sustainable = $row["Sustainable"];
		$myObj->WholeGrain = $row["WholeGrain"];
		$myObj->Halal = $row["Halal"];
		$myObj->AntibioticFree = $row["AntibioticFree"];
		$myObj->Vegan = $row["Vegan"];
		$myObj->ServingSize = $row["ServingSize"];
		$myObj->Calories = $row["Calories"];
		$myObj->CalsFat = $row["CalsFat"];
		$myObj->TotalFat = $row["TotalFat"];
		$myObj->SatFat = $row["SatFat"];
		$myObj->TransFat = $row["TransFat"];
		$myObj->Cholesterol = $row["Cholesterol"];
		$myObj->Sodium = $row["Sodium"];
		$myObj->TotalCarb = $row["TotalCarb"];
		$myObj->DietaryFiber = $row["DietaryFiber"];
		$myObj->Sugars = $row["Sugars"];
		$myObj->Protein = $row["Protein"];
		
		
		
		
		
		

        echo json_encode($myObj);
        $first++;        
        
    }
  
    echo ']';
} else {
    echo'[]';
}
$conn->close();
?>