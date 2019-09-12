import React from 'react';
import { Text, Image, View, TouchableHighlight, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Tools(props) {
     let col = "";
     if (props.title === "fav") {
          col = 'red'
     } else if (props.title === "settings") {
          col = 'blue'
     } else {
          col = 'yellow'
     }

     return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
               <AntDesign name={props.name} color='#000000' size={28} />
          </View>
     );

}