import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default function SearchFilterItems(props) {





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




  return (
    <View >
      <View style={{ width: '100%', borderColor:'#000000', borderBottomWidth:1 }}>
          <ListItem 
          contentContainerStyle ={{justifyContent:'center', alignItems:'center'}}
          title={props.modalOptions.modalName}
          titleStyle = {{color : '#000000'}}  
          />
      </View>
      {renderSeparator()}
 <View style={{ width: '100%', }}>
        <TouchableHighlight
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => {props.modalOptions.modalFav ? props.onFavChange() : props.onFavAdd()}}
        >
          <ListItem 
          contentContainerStyle ={{justifyContent:'center', alignItems:'center'}}
          title={props.modalOptions.modalFav? 'Remove From Favorites' : 'Undo'}
          titleStyle = {{color : '#c45959'}}  
          />
        </TouchableHighlight>
      </View>
     
      {renderSeparator()}

      <View style={{ width: '100%', }}>
        <TouchableHighlight
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => {}}
        >
          <ListItem 
          contentContainerStyle ={{justifyContent:'center', alignItems:'center'}}
          title={'Create Notification (Coming Soon)'}
          titleStyle = {{ color: '#bababa'} }  
          />
        </TouchableHighlight>
      </View>
    </View>
  );


}