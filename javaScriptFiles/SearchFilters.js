import React from 'react';
import { View,  Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SearchFilterItems from './SearchFilterItems';
import SearchFilterItemsCategory from './SearchFilterItemsCategory';




export default class SearchFilters extends React.Component {

  state = {
  
    visibleModalId: null,
    selection2: [],
  
  };

  
  
  onClose = () => {
    
    
    this.setState({ visibleModal: null })
    console.log(this.state.selection2);
    this.props.passSelected(this.state.selection2);
  }
  
  render() {

    return (
      <View style={styles.container}>
    
  

        <TouchableOpacity
          style={{ 
            backgroundColor: this.props.chosen? '#c45959' : '#ffffff',
            width: '100%', borderColor: '#949494', borderWidth: 1, borderLeftWidth: .5, borderRightWidth: .5, borderTopWidth: 0, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.setState({ visibleModal: 'bottom' })}
        >
          <Text style={{fontSize: 17*PixelRatio.getFontScale(), color: this.props.chosen? '#ffffff' : '#c45959',padding:5 }}>{this.props.label}</Text>
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
                <SearchFilterItemsCategory options={this.props.options} selected={this.props.selected} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c45959',

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