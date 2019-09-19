import React from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, PixelRatio} from 'react-native';
import {ListItem} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import * as Constants from './Constants'


const ratio = PixelRatio.getFontScale();
const fs = ratio*25;
const fsheart = ratio*30;
const fstitle = ratio*17;
const fssubtitle = ratio*15;





class FavoritesListItems extends React.Component {


  shouldComponentUpdate(nextProps){
    return !(nextProps.where.length === this.props.where.length);
  }

    render() {
      return (
        <View style = {{flex: 1}}>
        <TouchableOpacity onPress={()=>{this.props.onFoodPress(this.props.item, true)}}>
        <ListItem 
            rightAvatar = {
              <TouchableOpacity onPress = {()=>this.props.displayOptions(this.props.item)} style = {{width : '15%',  justifyContent: 'center', alignItems: 'center'}}>
              <Entypo name = {'dots-three-horizontal'} size = {fsheart} color = {Constants.mainColor}/>
              </TouchableOpacity>
            }
            
            titleProps = {{numberOfLines:1}}
            title = {this.props.item} 
            titleStyle = {{fontSize:fstitle}}
            subtitleStyle = {{color: 'grey', fontSize:fssubtitle}}
            containerStyle = {{backgroundColor: this.props.where.length ? '#ffffff': '#ededed' }}
            subtitle = {this.props.where.length ? this.props.where : 'unavailable'} 
        /></TouchableOpacity>
        </View>

      );
    }
  
  }
  
  export default FavoritesListItems;