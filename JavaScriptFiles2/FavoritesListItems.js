import React from 'react';
import {View, TouchableOpacity, Image, AsyncStorage, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';





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
              <Entypo name = {'dots-three-horizontal'} size = {28} color = {'#c45959'}/>
              </TouchableOpacity>
            }
            
            titleProps = {{numberOfLines:1}}
            title = {this.props.item} 
            subtitleStyle = {{color: 'grey'}}
            containerStyle = {{backgroundColor: this.props.where.length ? '#ffffff': '#ededed' }}
            subtitle = {this.props.where.length ? this.props.where : 'unavailable'} 
        /></TouchableOpacity>
        </View>

      );
    }
  
  }
  
  export default FavoritesListItems;