import React, { useState} from 'react';
import {  View, TouchableHighlight, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Constants from './Constants.js'

export default function SearchFilterItems(props) {

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
    return (
      <View style={{ width: '100%', }}>
        <TouchableHighlight
          underlayColor={Constants.mainColor}
          actiiveOpacity={1}
          onPress={() => { if (selected.includes(item)) { selectedOptions = selected.filter(name => !(name === item)); changeSelection(selectedOptions); } else { selectedOptions = selected.concat([item]); changeSelection(selected.concat([item]));  } }}
        >
          <ListItem 
          title={item}
          titleStyle = {{fontSize:18*Constants.fontMultiplier}}
            rightAvatar={

              selected.includes(item) ?

                <AntDesign name={'checkcircle'} size={18 * Constants.fontMultiplier} color={Constants.mainColor} />
                :
                null
            }
          />
        </TouchableHighlight>
      </View>

    );
  }


  return (
    <View  >
      <View style={{ width: '100%', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <TouchableHighlight
        style = {{width:'100%', borderWidth:1, borderColor:'black', borderRadius:10}}
          underlayColor={Constants.mainColor}
          actiiveOpacity={1}
          onPress={() => {changeSelection([]);}}
        >
          <ListItem title={'Clear'}
          titleStyle ={{fontSize:18*Constants.fontMultiplier, fontWeight:'bold', color: Constants.mainColor}}
          contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center',}}

          />
        </TouchableHighlight>

        {renderSeparator()}
      </View>


      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={props.options}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item}
      />

{renderSeparator()}

<View style={{ width: '100%', alignItems:'center', alignContent:'center', justifyContent:'center'}}>
        <TouchableHighlight
        style = {{width:'100%'}}
          underlayColor={Constants.mainColor}
          actiiveOpacity={1}
          onPress={() => {props.close(); props.passSelected(selected); }}
        >
          <ListItem title={'Go'}
          titleStyle ={{fontSize:18*Constants.fontMultiplier, fontWeight:'bold',color: Constants.mainColor}}
          contentContainerStyle = {{flex:1, justifyContent:'center', alignItems:'center'}}

          />
        </TouchableHighlight>

        {renderSeparator()}
      </View>
    </View>
  );


}