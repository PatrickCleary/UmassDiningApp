import React, { useState, useEffect } from 'react';
import { InteractionManager, View, TouchableHighlight, FlatList, PixelRatio } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default function SearchFilterItems(props) {

  const ratio = PixelRatio.getFontScale();
  [selected, changeSelected] = useState(props.selected);




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
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => { if (selected.includes(item)) { selectedOptions = selected.filter(name => !(name === item)); changeSelected(selectedOptions); props.passSelected(selectedOptions) } else { selectedOptions = selected.concat([item]); changeSelected(selected.concat([item])); props.passSelected(selectedOptions); } }}
        >
          <ListItem title={item}

            rightAvatar={

              selected.includes(item) ?

                <AntDesign name={'checkcircle'} size={17 * ratio} color={'#c45959'} />
                :
                null
            }
          />
        </TouchableHighlight>
      </View>

    );
  }


  return (
    <View >
      <View style={{ width: '100%', }}>
        <TouchableHighlight
          underlayColor='grey'
          actiiveOpacity={1}
          onPress={() => { changeSelected(props.options); props.passSelected(props.options) }}
        >
          <ListItem title={'All'}

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
    </View>
  );


}