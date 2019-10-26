import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { fixString } from './helperFunctions';
import * as Constants from './Constants'


export default function FoodPage(props) {

    const ratio = Constants.fontMultiplier;

    const textStyle = {
        fontSize:20*ratio,
        color: '#000000',
    }
    

    let [foodObj, changeFood] = useState([]);
    let [loading , setLoading] = useState(true);

    function getDietary(food){
        let Diet = [];
        
        if(food.Vegetarian==='1') Diet.push('Vegetarian');
        if(food.Loc==='1') Diet.push('Local');
        if(food.Sustainable==='1') Diet.push('Sustainable');
        if(food.WholeGrain==='1') Diet.push('WholeGrain');
        if(food.Halal==='1') Diet.push('Halal');
        if(food.AntibioticFree==='1') Diet.push('Antibiotic Free');
        if(food.Vegan==='1') Diet.push('Vegan');

        if(!Diet.length)
        return 'None';
        else{
            let str = '';
         for(let x =0; x<Diet.length-1; x++){
          str= str.concat(Diet[x] + ", ");
         }
         str = str.concat(Diet[Diet.length-1]);
         return str;   
        }


    }

    function getAllergens(food){
        let allergens = [];
        
        if(food.Milk==='1') allergens.push('Milk');
        if(food.Corn==='1') allergens.push('Corn');
        if(food.Eggs==='1') allergens.push('Eggs');
        if(food.Gluten==='1') allergens.push('Gluten');
        if(food.Soy==='1') allergens.push('Soy');
        if(food.Sesame==='1') allergens.push('Sesame');
        if(food.Treenuts==='1') allergens.push('Treenuts');
        if(food.Fish==='1') allergens.push('Fish');
        if(food.Shellfish==='1') allergens.push('Shellfish');
        if(food.Peanuts==='1') allergens.push('Peanuts');

        if(!allergens.length)
        return 'None';
        else{
            let str = '';
         for(let x =0; x<allergens.length-1; x++){
          str= str.concat(allergens[x] + ", ");
         }
         str = str.concat(allergens[allergens.length-1]);
         return str;   
        }


    }
    async function getFoodInfo(name){
        object = await AsyncStorage.getItem('nutInfo')

        jsonObj = await JSON.parse(object);
        return jsonObj;
    }

    useEffect(() => {
        setLoading(true);

        var name = fixString(props.name);

        
        nutInfoObject = getFoodInfo(name).then(foodObj => foodObj.filter((nutObj)=>nutObj.food == name)).then(foodInfo => changeFood(foodInfo[0]));
        
        setLoading(false);
     }
    , []);


    if (!loading) {

        if(foodObj){

        return (

            <View style={{ flex: 12, marginTop: 40, backgroundColor: '#ffffff' }}>


                <View style={{ backgroundColor: '#ffffff' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                        <TouchableOpacity style={{ flex: 1, paddingLeft: '3%' }} onPress={() => props.closeModal()}>
                            <Entypo name={'chevron-with-circle-down'} size={30*ratio} color={Constants.mainColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 27*ratio }}>{foodObj.food}</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, paddingRight: '3%' }} onPress={() => props.onFavChange(!props.favorite, props.name)}>
                            <AntDesign name={props.favorite ? 'heart' : 'hearto'} size={30*ratio} color={Constants.mainColor} />
                        </TouchableOpacity>
                    </View>


                </View>


                <View style={{ paddingLeft: '8%', paddingRight:'8%', paddingTop:'5%', backgroundColor: '#ffffff' }} >
 
                    <View style = {{borderColor:'#black', borderWidth:1}}>
                    <View style = {{paddingLeft:'1%', paddingRight:'1%'}}>

                    <Text style={textStyle}>Serving Size : {foodObj.ServingSize}</Text>
                    <Text style={textStyle}>Calories : {foodObj.Calories}</Text>
                    <Text style={textStyle}>Total Fat : {foodObj.TotalFat}</Text>
                    <Text style={textStyle}>Trans Fat : {foodObj.TransFat}</Text>
                    <Text style={textStyle}>Cholesterol : {foodObj.Cholesterol}</Text>
                    <Text style={textStyle}>Sodium : {foodObj.Sodium}</Text>
                    <Text style={textStyle}>Total Carbs : {foodObj.TotalCarb}</Text>
                    <Text style={textStyle}>Dietary Fiber : {foodObj.Dietaryfiber}</Text>
                    <Text style={textStyle}>Sugars : {foodObj.Sugars}</Text>
                    <Text style={textStyle}>Protein : {foodObj.Protein}</Text>
                    
                    <Text style = {textStyle}/>
                    
                    <Text style ={textStyle} >Allergens: {getAllergens(foodObj)}</Text>
                    <Text style = {textStyle}/>
                    <Text style = {textStyle} >Dietary: {getDietary(foodObj)}</Text>
                    </View>
                    </View>

                    <Text style = {{fontSize : 15*ratio}}>This information comes from the Umass Dining Website but may not be accurate.</Text>
                    <Text style = {textStyle}/>
                
                </View>

            </View>
        );
    }
    else {

        //fix this
        return (
            <View style={{ flex: 12, marginTop: 40, backgroundColor: '#ffffff' }}>


                <View style={{ backgroundColor: '#ffffff' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                        <TouchableOpacity style={{ flex: 1, paddingLeft: '3%' }} onPress={() => props.closeModal()}>
                            <Entypo name={'chevron-with-circle-down'} size={30*ratio} color={Constants.mainColor} />
                        </TouchableOpacity>
                        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 27*ratio }}>Unavailable</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, paddingRight: '3%' }} onPress={() => props.onFavChange(!props.favorite, props.name)}>

                            <AntDesign name={props.favorite ? 'heart' : 'hearto'} size={30*ratio} color={Constants.mainColor} />

                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        );
    }
}
    else{
         return(
        <View style={{ flex: 12, marginTop: 40, backgroundColor: '#ffffff', alignItems:'center', justifyContent:'center' }}>
                <ActivityIndicator size = 'large' color = {Constants.mainColor}/>
            </View>
        );   
    }



}


        /*
    
    #diets
    
    Vegetarian BIT DEFAULT 0,
    Loc BIT DEFAULT 0,
    Sustainable BIT DEFAULT 0,
    WholeGrain BIT DEFAULT 0,
    Halal BIT DEFAULT 0,
    AntibioticFree BIT DEFAULT 0,
    Vegan BIT DEFAULT 0,
    
    # nutritional Info
    
    ServingSize VARCHAR(16),
    
    Calories DECIMAL(4,1),
    CalsFat DECIMAL(4,1),
    Totalfat DECIMAL(4,1),
    Satfat DECIMAL(4,1),
    Transfat DECIMAL(4,1),
    Cholesterol DECIMAL(4,1),
    Sodium DECIMAL(4,1),
    Totalcarb DECIMAL(4,1),
    Dietaryfiber DECIMAL(4,1),
    Sugars DECIMAL(4,1),
    protein DECIMAL(4,1)
    

        */
       