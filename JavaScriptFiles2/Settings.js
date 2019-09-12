import React, { useState } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator, PixelRatio } from 'react-native';
import { getCorrectDate } from './helperFunctions';

const fs = PixelRatio.getFontScale();

const styleText = {
  fontSize: fs * 20,
}
const headerText = {
  fontSize: fs * 30
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
    <View style={{ flex: 12, justifyContent:'space-evenly' }}>
      <View style={{ paddingTop: '5%', flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <Text style = {headerText}>Menu:</Text>
        <Text></Text>
        <Text style={styleText}>Menu Date: {fixDates(props.menuDate)}</Text>
        <Text style={styleText}>Today's Date: {fixDates(getCorrectDate())}</Text>
        <Button color='#c45959' title={'Update Menu'} onPress={() => { setLoading([true, false]); setTimeout(() => { props.updateMenu(); setLoading([false, true]) }, 5000) }}
        />
        <View style={{ flex: 1 }}>

          {
            loadingMenu[0] ?
              <ActivityIndicator size='large' color='#c45959' />
              :
              loadingMenu[1] ?
                <Text style={styleText}>Menu updated.</Text>
                :
                <View style={{ flex: 1 }} />
          }
        </View>
      </View>
      <View style={{ flex: 1, paddingLeft: '5%', paddingRight: '5%' }}>
        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>

          <Text style={headerText}>Planned Features: </Text>
        </View>
        <Text style={styleText}></Text>
        <Text style={styleText}>- Notifications</Text>
        <Text style={styleText}>- Hours of operation</Text>
        <Text style={styleText}>- Menus for upcoming days</Text>
        <Text style={styleText}>- Filters based on allergen/nutrition info</Text>
        <Text style={styleText}></Text>
        <Text style={styleText}></Text>

        <Text style={styleText}></Text>
      </View>
        <View style={{flex:1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={headerText}>Suggestions? Questions? Contact me:</Text>
          <TextInput editable={false} multiline={true} style={{ fontSize: 20 * fs }}>patcleary11@gmail.com</TextInput>
        </View>

        <View style={{flex:.5, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <TextInput style={{fontSize:17*fs}} editable={false} multiline={true}>App Icon by freepik: "https://www.flaticon.com/authors/freepik" </TextInput>
      </View>
    </View>

  );

}