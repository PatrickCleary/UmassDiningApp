import React, { } from 'react';
import { View, TouchableOpacity, Text, PixelRatio} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import FoodList from './FoodList';
import Modal from 'react-native-modal';
import FoodPage from './FoodPage';
import SearchFilters from './SearchFilters';
import * as Constants from './Constants'


const fs = PixelRatio.getFontScale();
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
    
    //render Search page
    return (
        <View style={{ flex: 12 }}>
            <Modal

                isVisible={props.modalInfo.modalView}

                onSwipeComplete={() => props.closeModal()}
                swipeDirection="down"
                backdropColor={'#ffffff'}
                backdropOpacity={1}
                style={{ flex: 1, margin: 0 }}
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
            <View style = {{backgroundColor:Constants.mainColor, flex:.05}}>
            <TouchableOpacity underlayColor = {'#ffffff'} style = {{color:'#ffffff'}}  title = {'Clear Filters'} onPress = {()=>{props.clearFilters()}}>
            <View style = {{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
            <Text style= {{fontSize: 14*fs,color:'#ffffff'}}>Clear Filters</Text>
            </View>
            </TouchableOpacity>
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
