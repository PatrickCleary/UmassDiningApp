import React from 'react';
import { View,  Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SearchFilterItems from './SearchFilterItems';
import SearchFilterItemsCategory from './SearchFilterItemsCategory';
import * as Constants from './Constants'




export default class SearchFilters extends React.Component {

  state = {
  
    visibleModalId: null,
    selection2: [],
  
  };

  
  
  onClose = () => {
    
    
    this.setState({ visibleModal: null })
    this.props.passSelected(this.state.selection2);
  }
  
  render() {
    return (
      <View style = {{paddingRight:'1%', paddingLeft:'1%', paddingBottom:'1%', flex:1}}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center', borderRadius: 10, borderWidth:1 ,
        backgroundColor: this.props.chosen? Constants.mainColor : '#ffffff',
        borderColor: this.props.chosen? '#ffffff': Constants.mainColor
       }}>
    
  

        <TouchableOpacity
          style={{ 
            
            width: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.setState({ visibleModal: 'bottom' })}
        >
          <Text style={{fontSize: 17*Constants.fontMultiplier, color: this.props.chosen? '#ffffff' : Constants.mainColor ,padding:5 }}>{this.props.label}</Text>
        </TouchableOpacity>
        <Modal
          onBackdropPress={this.onClose}
          isVisible={this.state.visibleModal === 'bottom'}
          onSwipeComplete={this.onClose}
          swipeDirection={['down']}
          style={styles.bottomModal}

        >

         {
           (this.props.check==='cat')?
                <SearchFilterItemsCategory allCategories = {this.props.allCategories} holdSelection = {(selection)=>{this.setState({selection2:selection});}} options={this.props.options} selected={this.props.selected} close = {this.onClose} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
                  :
              <SearchFilterItems holdSelection = {(selection)=>{this.setState({selection2:selection});}} options={this.props.options} selected={this.props.selected} close = {this.onClose} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
         }
        </Modal>

      </View>
      </View>


    );

  }




}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',

  },
  content: {
  },
  bottomModal: {
    //alignItems:'center',
    //flexDirection:'column',

    justifyContent: 'center',
    margin: 15,
    borderColor:'black',
    borderWidth:1,
    borderRadius:100
  }
})