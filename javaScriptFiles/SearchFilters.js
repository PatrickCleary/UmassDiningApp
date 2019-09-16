import React from 'react';
import { View,  Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
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
      <View style={styles.container}>
    
  

        <TouchableOpacity
          style={{ 
            borderRadius:10,
            backgroundColor: this.props.chosen? Constants.mainColor : '#ffffff',
            width: '100%', borderColor: Constants.mainColor , borderWidth: 1, borderLeftWidth:(this.props.label =='Meal')? 1:0, borderRightWidth:(this.props.label =='Meal')? 1:0, borderRightColor:(this.props.chosen)?'#ffffff': Constants.mainColor,borderLeftColor:(this.props.chosen)?'#ffffff':Constants.mainColor, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.setState({ visibleModal: 'bottom' })}
        >
          <Text style={{fontSize: 17*PixelRatio.getFontScale(), color: this.props.chosen? '#ffffff' : Constants.mainColor ,padding:5 }}>{this.props.label}</Text>
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
                <SearchFilterItemsCategory holdSelection = {(selection)=>{this.setState({selection2:selection});}} options={this.props.options} selected={this.props.selected} close = {this.onClose} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
                  :
              <SearchFilterItems holdSelection = {(selection)=>{this.setState({selection2:selection});}} options={this.props.options} selected={this.props.selected} close = {this.onClose} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
         }
        </Modal>

      </View>


    );

  }




}

const styles = StyleSheet.create({
  container: {
    paddingLeft:'1%',
    paddingRight:'1%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',

  },
  content: {
  },
  bottomModal: {
    //alignItems:'center',
    //flexDirection:'column',
    justifyContent: 'flex-end',
    margin: 0,
  }
})