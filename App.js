import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import React, {Components, useState} from 'react';
import Main from './javaScriptFiles/Main.js';
import * as Constants from './javaScriptFiles/Constants.js';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default function App() {

  [page, setPage] = useState(1); 
  

  return (
  <SafeAreaView style = {{flex:1, backgroundColor:Constants.mainColor}}>
  <View style={{flex:1}}>
        
    
        <Main style = {{  flex:1}}  onChange = {(pageNum)=>setPage(pageNum)} pageNum = {page}/>



    </View>
  </SafeAreaView>

  )
}