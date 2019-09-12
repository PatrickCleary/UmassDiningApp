import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, PixelRatio } from 'react-native';
import FoodListItem from './FoodListItem';

const ratio = PixelRatio.getFontScale();
const fs = ratio*25;
let currentCategory = 'none';


export default class FoodList extends React.PureComponent {

  
  //seperates items in list
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


  renderHeader = ()=>{
    if(loading){
      return <ActivityIndicator  size = 'large' color = '#c45959'/>
    }else{
      return null;
    }
  }

  _renderItem = ({ item, index }) => {

    let categoryChange = true;
    if(index>0){
    if(item.category===this.props.jsonFood[index-1].category){
      categoryChange = false;
    }}

    //check if the menu item is a favorite before rendering
    item.favorite = false;

    for (let x = 0; x < this.props.favArray.length; x++) {

      if (this.props.favArray[x] === item.food) {
        item.favorite = true;
        break;
      }
    }

    return (
      
      <FoodListItem categoryChange = {categoryChange} onFoodPress={(foodName, favorite) => this.props.onFoodPress(foodName, favorite)} setFav={(boolean) => this.props.onFavChange(boolean, item.food)} item={item} favorite={item.favorite} />

    )
   
  };


  //render FlatList
  render() {
      return (
        <View style={{ flex: 1 }}>
              <FlatList
                //ListHeaderComponent ={this.renderHeader}
                removeClippedSubviews={true}
                ItemSeparatorComponent={this.renderSeparator}
                data={this.props.jsonFood}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item.food + item.hall + item.category + item.meal } 
                extraData={this.props.favArray}
                windowSize = {15}
                ListEmptyComponent = { <View style={{ alignItems: 'center', paddingTop: '1%' }}><Text >No results.</Text></View>}
              />

        </View>

      );
  }

}