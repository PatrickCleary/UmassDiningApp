import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, FlatList, PixelRatio } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Constants from './Constants';

//make this dynamic
const allCategories = ["Breads",
"Breakfast Pastries",
"Breakfast Entrees",
"Deli Bar",
"Desserts",
"Entrees",
"Express",
"Gluten Free",
"Grab n'Go Cold Lunch",
"International",
"Grill Station",
"Latino",
"Lunch/Dinner Miscellaneous",
"Grab n'Go Hot Lunch",
"Late Night Special",
"Noodle Bowl",
"North Display Worcester",
"Pasta Bar",
"Soups",
"Salad Bar/Dressings",
"Pizza",
"South Display Worcester",
"Starches",
"Vegetarian Line",
"Street Food",
"Vegetables",
"Sushi",
]

export default function SearchFilterItemsCategory(props) {

  const ratio = PixelRatio.getFontScale();
  [selected, changeSelected] = useState(props.selected);


  
  changeSelection = (selection)=>{
    changeSelected(selection);
    props.holdSelection(selection);
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#dedede",
          //marginLeft: ""
        }}
      />
    );
  };

  pushReturn = (array, name) => {
    //gotta make new array to cause state changge
    array.push(name);
    newArray = array;
    return newArray;
  }

  renderItem = ({ item }) => {
    let option = true;
    if(!props.options.includes(item)){
      option = false;
      
    }

    return (
      <View style={{ flex: .3333333 }}>
        <TouchableHighlight
          actiiveOpacity={1}
          onPress={() => { if (selected.includes(item)) { selectedOptions = selected.filter(name => !(name === item)); changeSelection(selectedOptions); } else { selectedOptions = selected.concat([item]); changeSelection(selected.concat([item]));  } }}
        >
          <ListItem title={item}
            titleProps={{ numberOfLines: 1 }}
            titleStyle = {{fontSize: 14*ratio}}
            containerStyle={{backgroundColor: option? '#ffffff' : '#ededed'}}
            rightAvatar={

              selected.includes(item) ?

                <AntDesign name={'checkcircle'} size={14 * ratio} color={Constants.mainColor} />

                :
                null
            }
          />
        </TouchableHighlight>
      </View>

    );
  }


  return (
    <View style >
      
      <View style={{ width: '100%', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <TouchableHighlight
        style = {{width:'100%'}}
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => {changeSelection([]);}}
        >
          <ListItem title={'Clear'}
          titleStyle ={{fontSize:18*ratio, color: Constants.mainColor}}
          contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center'}}

          />
        </TouchableHighlight>

        {renderSeparator()}
      </View>

      <View style={{ backgroundColor: '#ffffff' }}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={allCategories}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item}
          numColumns={3}
        />
      </View >
      {renderSeparator()}

      <View style={{ width: '100%', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          style={{ width: '100%' }}
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => { props.close(); props.passSelected(selected); }}
        >
          <ListItem title={'Go'}
            titleStyle={{ fontSize: 18 * ratio, color: Constants.mainColor }}
            contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}

          />
        </TouchableHighlight>

        {renderSeparator()}
      </View>
    </View>
  );


}