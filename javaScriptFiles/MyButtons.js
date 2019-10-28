import React, { } from 'react';
import { View,  Text,  TouchableOpacity } from 'react-native';
import * as Constants from './Constants'





export default function MyButtons(props){

    
return (
    <View style = {{paddingRight:'1%', paddingLeft:'1%', paddingBottom:'1%', flex:1}}>
    <View style={{
      justifyContent: 'center',
      alignItems: 'center', borderRadius: 10, borderWidth:1 ,
      backgroundColor: props.chosen? Constants.mainColor : '#ffffff',
      borderColor: props.chosen? '#ffffff': Constants.mainColor
     }}>
  


      <TouchableOpacity
        style={{ 
          
          width: '100%', justifyContent: 'center', alignItems: 'center', alignContent:'center' }}
        onPress={() => props.onPress()}
      >
        <Text style={{fontSize: 17*Constants.fontMultiplier, color: props.chosen? '#ffffff' : Constants.mainColor ,padding:5 }}>{props.label}</Text>
      </TouchableOpacity>

            </View>
            </View>
);
      }
