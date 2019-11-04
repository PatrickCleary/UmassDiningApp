import React, { useState} from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import FoodList from './FoodList';
import Modal, { SlideAnimation } from 'react-native-modals';

import FoodPage from './FoodPage';
import SearchFilters from './SearchFilters';
import * as Constants from './Constants'
import MyButtons from './MyButtons'



/*Flat list:
    key extractor must be unique and dont use index because it will rerender when scrolling
    You goootttta use a shouldComponentUpdate because otherwise the stupid thing will rerender every item from the top every single goddamn time.
    maybe stop using ()=>??? idk bruh
*/

//search page function

export default function Search(props) {

    let dayOfWeek = new Date().getDay()
    let mealArray = (dayOfWeek==0 || dayOfWeek==6)?  [ 'Brunch', 'Dinner', 'Late Night', 'Grab And Go']:['Breakfast', 'Lunch', 'Dinner', 'Late Night', 'Grab And Go'];
    let hallArray = ['Berkshire', 'Hampshire', 'Franklin', 'Worcester'];
    let categoryArray = props.categoriesProp;
    
    let [availableNow, setAvailableNow] = useState(false)
    

    

    //render Search page
    return (
        <View style={{ flex: 12 }}>
            <Modal

                visible={props.modalInfo.modalView}
                swipeDirection={['up', 'down']} // can be string or an array
                swipeThreshold={20} // default 100
                rounded = {true}
                onSwipeOut={(event) => {
                    props.closeModal();
                   }}
                   onTouchOutside={() => {
                    props.closeModal();
                  }}

                backdropColor={'#ffffff'}
                backdropOpacity={1}
                modalAnimation={new SlideAnimation({
                    slideFrom: 'bottom',
                  })}
            >
                <FoodPage
                    onFavChange={(boolean, foodName) => { props.onFavChangeModal(boolean, foodName) }}
                    name={props.modalInfo.modalName}
                    closeModal={() => props.closeModal()}
                    favorite={props.modalInfo.modalFav}
                />
            </Modal>

            <SearchBar returnKeyType='search' inputContainerStyle={{ backgroundColor: '#ffffff' }} searchIcon={style = { color: Constants.mainColor }} cancelButtonProps={buttonStyle = { color: '#ffffff' }} containerStyle={{ backgroundColor: Constants.mainColor }} autoCorrect={false} platform='ios' lightTheme={true} placeholder="Search Today's Menu" onChangeText={(text) => { props.onChangeText(text) }} value={props.searchTerm} ></SearchBar>
            <View style={{ flexDirection: 'row', backgroundColor:Constants.mainColor }}>
                <SearchFilters selected={props.hallFilter} options={hallArray} passSelected={(selected) => props.passSelectedHalls(selected)} label={"Hall"} chosen={props.hallChosen} />
                <SearchFilters selected={props.mealFilter} options={mealArray} passSelected={(selected) => props.passSelectedMeals(selected)} label={"Meal"} chosen={props.mealChosen} />
                <SearchFilters selected={categoryFilter} allCategories={props.allCategories} options={categoryArray} check={'cat'} passSelected={(selected) => props.passSelectedCategories(selected)} label={"Category"} chosen={props.categoryChosen} />
            </View>
            
            <View style = {{backgroundColor:Constants.mainColor, flexDirection:'row', paddingBottom:'1%'}}>
            <MyButtons label={'ask notif'} chosen={props.hallChosen || props.mealChosen} onPress = {()=>props.requestNotif()}/>

            </View>
            <FoodList
                onFoodPress={(foodName, favorite) => props.onFoodPress(foodName, favorite)}
                jsonFood={props.searchObject}
                favArray={props.jsonFavs}
                onFavChange={(boolean, foodName) => { props.onFavChange(boolean, foodName) }}
            />


        </View>

    );

}
