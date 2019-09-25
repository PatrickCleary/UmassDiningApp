import React, { useState, } from 'react';
import { View, AsyncStorage, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { arrayToString } from './helperFunctions';
import FavoritesListItems from './FavoritesListItems';
import FoodPage from './FoodPage.js';
import Modal from 'react-native-modal';
import FavoritesOptionsList from './FavoritesOptionsList';
import { FontAwesome } from '@expo/vector-icons';
import * as Constants from './Constants'






export default function Favorites(props) {




  [food, setFood] = useState('');
  [modalOptions, setModalOptions] = useState({ modalName: '', modalFav: true, modalView: false });


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#dedede",
          //marginLeft: "7%"
        }}
      />
    );
  };



  _renderItem = ({ item }) => {

    var b = [];
    var l = [];
    var d = [];
    var ln = [];
    var gg = [];
    var where = '';

    for (var x = 0; x < props.menu.length; x++) {
      if (item === props.menu[x].food) {
        switch (props.menu[x].meal) {
          case ('Breakfast'):
            b.push(props.menu[x].hall);
            break;

          case ('Lunch'):
            l.push(props.menu[x].hall);
            break;

          case ('Dinner'):
            d.push(props.menu[x].hall);
            break;

          case ('Late Night'):
            ln.push(props.menu[x].hall);
            break;

          case ('Grab And Go'):
            gg.push(props.menu[x].hall);
            break;

        }

      }


    }



    where = where.concat(
      b.length > 0 ? 'Breakfast: ' + arrayToString(b) + '\n' : '').concat(
        l.length > 0 ? 'Lunch: ' + arrayToString(l) + '\n' : '').concat(
          d.length > 0 ? 'Dinner: ' + arrayToString(d) + '\n' : '').concat(
            ln.length > 0 ? 'Late Night: ' + arrayToString(ln) + '\n' : '').concat(
              gg.length > 0 ? 'Grab and Go: ' + arrayToString(gg) + '\n' : '');
    where = where.substring(0, where.length - 1);




    return (<FavoritesListItems displayOptions={(item) => setModalOptions({ modalFav: true, modalName: item, modalView: true })} onFoodPress={(foodName, bool) => { props.onFoodPress(foodName, bool); }} where={where} item={item} />

    )
  };
  return (
    <View style={{ flex: 12, justifyContent: 'center', alignItem: 'center' }}>


      <Modal
        isVisible={props.modalInfo.modalView}
        onSwipeComplete={() => props.closeModal()}
        swipeDirection="down"
        backdropColor={'#ffffff'}
        backdropOpacity={1}
        style={{ flex: 1, margin: 0, justifyContent: 'flex-end', }}
      >
        <FoodPage
          name={props.modalInfo.modalName}
          closeModal={() => props.closeModal()}
          favorite={props.modalInfo.modalFav}
          onFavChange={(boolean, foodName) => { props.onFavChangeModal(boolean, foodName) }} />
      </Modal>

      <Modal
        isVisible={modalOptions.modalView}
        onSwipeComplete={() => setModalOptions({ ...modal, modalView: false })}
        onBackdropPress={() => setModalOptions({ ...modal, modalView: false })}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0, }}




      >

        <FavoritesOptionsList
          onFavChange={() => { props.onFavChange(!modalOptions.modalFav, modalOptions.modalName); setModalOptions({ ...modalOptions, modalFav: false }) }}
          onFavAdd={() => { props.onFavChange(!modalOptions.modalFav, modalOptions.modalName); setModalOptions({ ...modalOptions, modalFav: true }) }}
          modalOptions={modalOptions} Button={[{ name: 'Remove From Favorites', function: 1 }, { name: 'View Nutrition Info', function: 2 }, { name: 'Create Notification (Coming Soon)', function: 3 }]} />


      </Modal>


      <View style={{ backgroundColor: Constants.mainColor, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >

          <TouchableOpacity style={{ flex: 1, paddingLeft: '3%' }} onPress={() => { }}>
          </TouchableOpacity>
          <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
            <Text style={{ color: 'white', fontFamily: 'Copperplate', fontSize: 40 * Constants.fontMultiplier, paddingBottom:'3%'  }}>{'Favorites'}</Text>
          </View>
          <TouchableOpacity style={{ flex: 1, paddingRight: '3%', paddingBottom:'3%' }}
            onPress={() => Alert.alert(
              'Remove All Favorites?', '',
              [{ text: 'Yes', onPress: async function () { await AsyncStorage.removeItem('favoritesArray'); props.favClear() }, style: 'cancel' },
              { text: 'Cancel' }])}>
            <FontAwesome name={'trash'} size={34 * Constants.fontMultiplier} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ backgroundColor: '#dedede', width: '100%', height: 1 }}></View>
      <View style={{ flex: 10 }}>
        { props.favArray.length?
        <FlatList

          removeClippedSubviews={true}

          ItemSeparatorComponent={renderSeparator}
          data={props.favArray}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item}

        />:
        <View style = {{alignItems:'center'}}>
        <Text>No Favorites.</Text>
        </View>
        }
      </View>
    </View>


  );

}