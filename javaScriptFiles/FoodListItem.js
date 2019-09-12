import React from 'react';
import { View, TouchableOpacity, Text, PixelRatio } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const ratio = PixelRatio.getFontScale();
const fs = ratio*30;



/*
TODOS:
better hall/meal selection
overlays
Meal preference filters.
Only one entry of each food in favorites. (edge cases).
Reg Expression edge cases on search like parantheses.
Pull to refresh todays menu.
filters on favorites.


DONE:
search/ filter in favorites

*/
class FoodListItem extends React.Component {


  shouldComponentUpdate(nextProps) {
    return !(nextProps.favorite === this.props.favorite)

  }

  foodPress=()=>{
    this.props.onFoodPress(this.props.item.food, this.props.favorite)
  }

  favPress =()=>{
    this.props.setFav(!this.props.favorite);
  }

  render() {
    return (
      <View 
      style={{ flex: 1 }}>

        {this.props.categoryChange?
          <View style = {{justifyContent:'center', alignItems:'center', backgroundColor:'#000000'}}>
          <Text style = {{flex:1, fontSize:fs, fontFamily:'Copperplate', color:'white'}}>{this.props.currentCategory}</Text>
          </View>
        :
            null
        }
        <TouchableOpacity onPress={this.foodPress}>
          <ListItem
            rightAvatar={
              <TouchableOpacity
                onPress={this.favPress}
                style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name={this.props.favorite ? 'heart' : 'hearto'} size={25} color={'#c45959'} />
              </TouchableOpacity>
            }
            titleProps={{ numberOfLines: 1 }}
            titleStyle={{ color: 'black' }}
            title={this.props.item.food}
            subtitle={this.props.item.hall + " - " + this.props.item.meal + " - " + this.props.item.category}
            subtitleStyle={{ color: 'grey' }}
          /></TouchableOpacity>
      </View>

    );
  }

}

export default FoodListItem;