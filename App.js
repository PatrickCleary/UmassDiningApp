import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import React, {Components, useState} from 'react';
import Main from './javaScriptFiles/Main.js';
import * as Constants from './javaScriptFiles/Constants.js';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default function App() {

  [page, setPage] = useState(1); 
  let bgcolor = '#ffffff'
  switch(page){
    case(1): 
    bgcolor = Constants.mainColor;
    break;
    case(2):
    bgcolor = "#f0f0f0";
    break;
    case(3):
    bgcolor = "#ffffff";
    break;
    default :
    bgcolor = '#000000'
    break;
  }

  return (
  <SafeAreaView style = {{flex:1, backgroundColor:bgcolor}}>
  <View style={{flex:1}}>
        
    
        <Main style = {{  flex:1}}  onChange = {(pageNum)=>setPage(pageNum)} pageNum = {page}/>



    </View>
  </SafeAreaView>

  )
}