import React from 'react';
import { Text, Image, View, TouchableHighlight, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Constants from './Constants'

export default function Tools(props) {
     
     
     return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
               <AntDesign name={props.name} color= {'#ffffff'} size={props.page? 34: 28} />
          </View>
     );

}