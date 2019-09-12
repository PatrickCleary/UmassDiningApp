import React from 'react';
import { View,  Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SearchFilterItems from './SearchFilterItems';
import SearchFilterItemsCategory from './SearchFilterItemsCategory';



//console.log

export default class SearchFilters extends React.Component {

  state = {
  
    visibleModalId: null,
    selected: this.props.selected,
  
  };

  
  
  onClose = () => {
    
    
    this.setState({ visibleModal: null })
  }
  
  render() {

    return (
      <View style={styles.container}>
    
  

        <TouchableOpacity
          style={{ width: '100%', height: 50, borderColor: '#000000', borderWidth: 1, borderLeftWidth: .5, borderRightWidth: .5, borderTopWidth: 0, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => this.setState({ visibleModal: 'bottom' })}
        >
          <Text allowFontScaling  = {false} style={{fontSize: 24*PixelRatio.getFontScale(), color: '#ffffff' }}>{this.props.label}</Text>
        </TouchableOpacity>
        <Modal
          onBackdropPress={this.onClose}
          isVisible={this.state.visibleModal === 'bottom'}
          onSwipeComplete={this.onClose}
          swipeDirection={['down']}
          style={styles.bottomModal}
          onShow = {()=>this.setState({selected: []})}

        >
         {
           (this.props.check==='cat')?
                <SearchFilterItemsCategory options={this.props.options} selected={this.state.selected} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
                  :
              <SearchFilterItems options={this.props.options} selected={this.state.selected} passSelected={(selectionArray) =>{this.props.passSelected(selectionArray)}}/>
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