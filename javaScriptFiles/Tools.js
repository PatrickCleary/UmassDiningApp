import React from 'react';
import {  View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Tools(props) {
     
     //Make size of icons dynamic?
     return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
               
               <AntDesign name={props.name} color= {'#ffffff'} size={props.page? 34: 28} />
          </View>
     );

}