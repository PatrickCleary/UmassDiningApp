import React, { useState, } from 'react';
import { View, AsyncStorage, FlatList, TouchableOpacity, Alert, Text } from 'react-native';
import { arrayToString, fixString } from './helperFunctions';
import FavoritesListItems from './FavoritesListItems';
import FoodPage from './FoodPage.js';
import Modal from 'react-native-modal';
import FavoritesOptionsList from './FavoritesOptionsList';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements'
import FoodList from './FoodList';


import * as Constants from './Constants'






export default function Favorites(props) {




  [searching, setSearching] = useState(false);
  [food, setFood] = useState('');
  [modalOptions, setModalOptions] = useState({ modalName: '', modalFav: true, modalView: false });
  [searchObject, setSearchObject] = useState(props.nutritionInfo)
  [searchTerm, updateSearchTerm] = useState('');

  function updateSearch(searchTerm){
    updateSearchTerm(searchTerm);
    var regex = new RegExp(`\\b${fixString(searchTerm)}.*`, 'gi');
    const foods = props.nutritionInfo.filter((foodObj) => foodObj.food.match(regex));
    setSearchObject(foods);


  }

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
        if(props.menu[x]["hb"] ==1 ) b.push("Hampshire")
        if(props.menu[x]["bb"] ==1 ) b.push("Berkshire")
        if(props.menu[x]["wb"] ==1 ) b.push("Worcester")
        if(props.menu[x]["fb"] ==1 ) b.push("Franklin")

        if(props.menu[x]["hl"] ==1 ) l.push("Hampshire")
        if(props.menu[x]["bl"] ==1 ) l.push("Berkshire")
        if(props.menu[x]["wl"] ==1 ) l.push("Worcester")
        if(props.menu[x]["fl"] ==1 ) l.push("Franklin")

        if(props.menu[x]["hd"] ==1 ) d.push("Hampshire")
        if(props.menu[x]["bd"] ==1 ) d.push("Berkshire")
        if(props.menu[x]["wd"] ==1 ) d.push("Worcester")
        if(props.menu[x]["fd"] ==1 ) d.push("Franklin")

        if(props.menu[x]["hln"] ==1 ) ln.push("Hampshire")
        if(props.menu[x]["bln"] ==1 ) ln.push("Berkshire")
        if(props.menu[x]["wln"] ==1 ) ln.push("Worcester")
        if(props.menu[x]["fln"] ==1 ) ln.push("Franklin")

        if(props.menu[x]["hgg"] ==1 ) gg.push("Hampshire")
        if(props.menu[x]["bgg"] ==1 ) gg.push("Berkshire")
        if(props.menu[x]["wgg"] ==1 ) gg.push("Worcester")
        if(props.menu[x]["fgg"] ==1 ) gg.push("Franklin")


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
        
        <TouchableOpacity style={{ flex: 1, paddingLeft: '3%', paddingBottom:'3%' }}
            onPress={() => Alert.alert(
              'Remove All Favorites?', '',
              [{ text: 'Yes', onPress: async function () { await AsyncStorage.removeItem('favoritesArray'); props.favClear() }, style: 'cancel' },
              { text: 'Cancel' }])}>
            <FontAwesome name={'trash'} size={34 * Constants.fontMultiplier} color={'#ffffff'} />
          </TouchableOpacity>
          <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
            <Text style={{ color: 'white', fontFamily: 'Copperplate', fontSize: 40 * Constants.fontMultiplier, paddingBottom:'3%'  }}>{'Favorites'}</Text>
          </View>
          {searching?
          <TouchableOpacity style={{ flex: 1, paddingRight: '3%' }} onPress={() => {setSearching(false)}}>
          <AntDesign name={'check'} color= {'#ffffff'} size={34*Constants.fontMultiplier} />
          
          </TouchableOpacity>

          :
          <TouchableOpacity style={{ flex: 1, paddingRight: '3%' }} onPress={() => {setSearching(true); setSearchObject(props.nutritionInfo) }}>
          <AntDesign name={'plus'} color= {'#ffffff'} size={34*Constants.fontMultiplier} />

          </TouchableOpacity>
          }
        </View>
      </View>
      <View style={{ backgroundColor: '#dedede', width: '100%', height: 0 }}></View>
      {searching?
      <View style = {{flex:10}}>
          <SearchBar returnKeyType='search' inputContainerStyle={{ backgroundColor: '#ffffff' }} searchIcon={style = { color: Constants.mainColor }} cancelButtonProps={buttonStyle = { color: '#ffffff' }} containerStyle={{ backgroundColor: Constants.mainColor }} autoCorrect={false} platform='ios' lightTheme={true} placeholder="Search Menu" onChangeText={(text) => { updateSearch(text) }} value={searchTerm} ></SearchBar>
          <FoodList  
              onFoodPress={(foodName, favorite) => props.onFoodPress(foodName, favorite)}
              jsonFood={searchObject}
              favArray={props.favArray}
              onFavChange={(boolean, foodName) => { props.onFavChange(boolean, foodName) }}/>
        </View>
      :


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

      }
    </View>


  );

}