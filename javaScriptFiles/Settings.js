import React, { useState } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator, PixelRatio, Linking } from 'react-native';
import { getCorrectDate } from './helperFunctions';
import * as Constants from './Constants';

const fs = PixelRatio.getFontScale();

const styleText = {
  fontSize: fs * 17,
}
const headerText = {
  fontSize: fs * 25
}

function fixDates(date) {
  let dateStr = date.toString();

  let array = dateStr.split('');
  let newString = [array[4], array[5], '/', array[6], array[7], '/', array[0], array[1], array[2], array[3]]
  let returnstr = newString.join("");
  return returnstr;
}

export default function Settings(props) {


  [loadingMenu, setLoading] = useState(false, false);


  return (
    <View style={{ flex: 12, justifyContent:'space-between' }}>
      <View style={{ paddingTop: '5%', flex: 1.2, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text style = {headerText}>Menu:</Text>
        <Text></Text>
        <Text style={styleText}>Menu Date: {fixDates(props.menuDate)}</Text>
        <Text style={styleText}>Today's Date: {fixDates(getCorrectDate())}</Text>
        <Button color={Constants.mainColor} title={'Update Menu'} onPress={() => { setLoading([true, false]); setTimeout(() => { props.updateMenu(); setLoading([false, true]) }, 5000) }}
        />
        <View style={{ flex: 1 }}>

          {
            loadingMenu[0] ?
              <ActivityIndicator size='large' color={Constants.mainColor} />
              :
              loadingMenu[1] ?
                <Text >Menu updated.</Text>
                :
                <View style={{ flex: 1 }} />
          }
        </View>
      </View>
      <View style={{ flex: 1, paddingLeft: '5%', paddingRight: '5%' }}>
        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>

        <Text style={headerText}>Umass Dining:</Text>
        <Button color = {Constants.mainColor} onPress={() => Linking.openURL('https://umassdining.com/locations-menus') }
      title="https://umassdining.com/locations-menus" />


        </View>
      </View>
        <View style={{flex:1, padding: '5%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={headerText}>Suggestions? Questions?</Text>
          
          <Text style = {headerText}> Contact me:</Text>
          <Button color = {Constants.mainColor} onPress={() => Linking.openURL('mailto:patcleary11@gmail.com') }
      title="patcleary11@gmail.com" />
        </View>



        <View style={{flex:.5, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <Text style={{fontSize:17*fs}} >App Icon by MapBox: </Text>
        <Button color= {Constants.mainColor} title = "https://www.iconfinder.com/iconsets/maki" onPress = {()=>console.log(Linking.openURL('https://www.iconfinder.com/iconsets/maki'))}></Button>
        <Text>Copyright© 2012, MapBox, LLC. All rights reserved.</Text>
        <Text> </Text>
      </View>
    </View>

  );

}