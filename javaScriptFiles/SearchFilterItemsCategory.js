import React, { useState, useEffect } from 'react';
import { View, TouchableHighlight, FlatList, PixelRatio } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Constants from './Constants';

//make this dynamic

export default function SearchFilterItemsCategory(props) {
  
  const allCategories = props.allCategories;
  
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
          <ListItem 
            title={item}
            titleProps={{ numberOfLines: 1 }}
            titleStyle = {{fontSize: 18*ratio,  paddingTop:0}}
            containerStyle={{ padding:'5%', alignItems:'center', justifyContent:'center',paddingTop:'5%', paddingBottom:'5%',alignContent:'center', justifyContent:'center', backgroundColor: option? '#ffffff' : '#ededed'}}
            rightAvatar={

              selected.includes(item) ?

                <AntDesign name={'checkcircle'} size={18 * ratio} color={Constants.mainColor} />

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