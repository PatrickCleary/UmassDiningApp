import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Constants from './Constants'


const fs = Constants.fontMultiplier*25;
const fsheart = Constants.fontMultiplier*30;
const fstitle = Constants.fontMultiplier*17;
const fssubtitle = Constants.fontMultiplier*15;



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
    return (!(nextProps.favorite === this.props.favorite) || !(nextProps.categoryChange == this.props.categoryChange))


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
          <View style = {{justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff', paddingtTop:'5%'}}>
          <Text style = {{flex:1, fontSize:fs, textDecorationLine: 'underline', fontFamily:'Copperplate', color:'#383838'}}>{this.props.item.category}</Text>
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
                <AntDesign name={this.props.favorite ? 'heart' : 'hearto'} size={fsheart} color={Constants.mainColor} />
              </TouchableOpacity>
            }
            titleProps={{ numberOfLines: 1 }}
            titleStyle={{ color: 'black', fontSize : fstitle }}
            title={this.props.item.food}
            subtitle={this.props.item.hall + " - " + this.props.item.meal}
            subtitleStyle={{ color: 'grey', fontSize: fssubtitle }}
          /></TouchableOpacity>
      </View>

    );
  }

}

export default FoodListItem;