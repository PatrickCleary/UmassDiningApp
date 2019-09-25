import React, { useState, useEffect, } from 'react';
import { AsyncStorage, View } from 'react-native';
import Favorites from './Favorites';
import Settings from './Settings';
import Search from './Search';
import FoodPage from './FoodPage';
import { getCorrectDate, fixString } from './helperFunctions';



var objectMinusCategoryFilters = [];
//getMenu useEffecty
async function favChange(boolean, foodName) {
    const oldFaves = await AsyncStorage.getItem('favoritesArray');
    let favsArray = JSON.parse(oldFaves);

    if (boolean) {
        if (!favsArray) {
            favsArray = [];
        }
            favsArray.push(foodName);
            favsArray.sort();
        
        favsStr = JSON.stringify(favsArray);


        await AsyncStorage.setItem('favoritesArray', favsStr);
    }
    else {

        favsArray = favsArray.filter((value) => !(value === foodName));
        favsStr = JSON.stringify(favsArray);
        await AsyncStorage.setItem('favoritesArray', favsStr);
    }
    getFavs();
}


//load menu from async storage
async function getAsyncMenu() {

    try {
        await AsyncStorage.getItem('todaysMenu').then(object => JSON.parse(object)).then(object => { updateSearchObject(object) });
    } catch (error) {
        console.error(error);
    }
}

//load favorite foods from async storage
async function getFavs() {
    try {
        let newFavs = await AsyncStorage.getItem('favoritesArray').then(object => object ? changeFavs(JSON.parse(object)) : changeFavs([]));
    } catch (error) {
        console.error(error);
    }
}



//save fetch results into async and update todays's menu
async function saveData(todaysMenu) {
    updateSearchObject(todaysMenu);
    try {
        let JSONString = JSON.stringify(todaysMenu);
        await AsyncStorage.setItem('todaysMenu', JSONString);

    } catch (error) {
        console.error(error);
    }

}



export default function CenterPiece(props) {

function getCategories(all){
    if(objectMinusCategoryFilters.length === 0 || all == true){
        let categorySet = new Set([]);
        for(let x = 0; x< todaysMenu.length; x++){
            categorySet.add(todaysMenu[x].category);
            
            //what does this dos
        }
        return  Array.from(categorySet);
    }

    let categorySet = new Set([]);
            
    for(let x = 0; x< objectMinusCategoryFilters.length; x++){
                categorySet.add(objectMinusCategoryFilters[x].category);
            
            }

            return  Array.from(categorySet);
}


    function updateSearch(jsonFood, searchTerm, hallFilter, mealFilter, categoryFilter) {


            updateSearchTerm(searchTerm);

            var regex = new RegExp(`\\b${fixString(searchTerm)}.*`, 'gi');

            const foods = jsonFood.filter((foodObj) => foodObj.food.match(regex));

            const halls = foods.filter((foodObj) => (hallFilter.length ? hallFilter.includes(foodObj.hall) : true));

            const meals = halls.filter((foodObj) => (mealFilter.length ? mealFilter.includes(foodObj.meal) : true));
            
            objectMinusCategoryFilters = meals;
            
            const category = meals.filter((foodObj) => (categoryFilter.length ? categoryFilter.includes(foodObj.category) : true));
            

            updateSearchObject(category);



    }



    function onFoodPress(foodName, favorite) {

        setModal({ modalName: foodName, modalView: true, modalFav: favorite });

    }



    //PHP SQL query
    async function updateMenu() {
        let date = getCorrectDate();

        const query = "SELECT * FROM todaysMenu" + date + ' ORDER BY category, food;';
        const data = { query: query }

        const url = 'http://diningapphost.online/requestData.php'
        const body = { method: 'POST', body: JSON.stringify(data) };
        try {
            let response = await fetch(url, body)
            let responseJSON = await response.json()
            saveData(responseJSON);
            updateTodaysMenu(responseJSON);
            setMenuDate(date);
            setLoading(false);
        }
        catch (error) { console.error(error) };
    }

    function getMenu() {
        todaysDate = getCorrectDate();

        if (menuDate != todaysDate) {
            updateMenu();
            getFavs();
        } else {
            getAsyncMenu();
            getFavs();
        }
    }

    //todays menu
    [todaysMenu, updateTodaysMenu] = useState([]);

    //menu date used to determine if update necessary.
    [menuDate, setMenuDate] = useState(0);

    //favs array
    [jsonFavs, changeFavs] = useState([]);

    //current search array
    [searchObject, updateSearchObject] = useState([]);

    //current search term and filters
    [searchTerm, updateSearchTerm] = useState('');
    [mealFilter, changeMealFilter] = useState([]);
    [hallFilter, changeHallFilter] = useState([]);
    [categoryFilter, changeCategoryFilter] = useState([]);
    
    //try not to use state for this...

    [loading, setLoading] = useState(true);


    //Modal State
    [modal, setModal] = useState({ modalView: false, modalName: '', modalFav: false });

    useEffect(() => getMenu(), []);


    if (props.pageNum == 0) {
        return <Test />
    } else
     
     
        if (props.pageNum === 1) {
            //return <AsyncTest style = {{flex:9}}/>

            return <Search

                loading = {loading}
                
                style={{ flex: 9 }}

                //search term and when it is updated
                onChangeText={(text) => {updateSearch(todaysMenu, text, hallFilter, mealFilter, categoryFilter); }}
                searchTerm={searchTerm}

                //modal info and functions:
                onFavChangeModal={(boolean, foodName) => { boolean ? changeFavs([...jsonFavs, foodName]) : changeFavs(jsonFavs.filter((food) => !(food === foodName))); setModal({ ...modal, modalFav: boolean }); favChange(boolean, foodName) }}
                closeModal={() => setModal({ ...modal, modalView: false })}
                modalInfo={modal}

                //filters for meals, halls and their labels.
                passSelectedHalls={(selected) => { updateSearch(todaysMenu, searchTerm, selected, mealFilter, categoryFilter); changeHallFilter(selected); }}
                passSelectedMeals={(selected) => { updateSearch(todaysMenu, searchTerm, hallFilter, selected, categoryFilter); changeMealFilter(selected); }}
                passSelectedCategories={(selected) => { updateSearch(todaysMenu, searchTerm, hallFilter, mealFilter, selected); changeCategoryFilter(selected); }}
                clearFilters ={()=>{changeHallFilter([]);changeMealFilter([]); changeCategoryFilter([]); updateSearch(todaysMenu, searchTerm, [], [], [])}}
                hallChosen={hallFilter.length>0 }
                mealChosen={(mealFilter.length> 0)}
                categoryChosen = {(categoryFilter.length>0)}
                hallFilter = {hallFilter}
                mealFilter = {mealFilter}
                categoryLabel={(categoryFilter.length < 1 || categoryFilter.length > 4) ? 'Select Category' : categoryFilter.toString()}
                categoriesProp = {getCategories(false)}
                allCategories = {getCategories(true)}
                //function to open nutrition facts.
                onFoodPress={(foodName, favorite) => onFoodPress(foodName, favorite)}

                //updates favorites on food list.
                onFavChange={(boolean, foodName) => { boolean ? changeFavs([...jsonFavs, foodName]) : changeFavs(jsonFavs.filter((food) => !(food === foodName))); favChange(boolean, foodName) }}

                //JSON of search results and favorites.
                searchObject={searchObject}
                jsonFavs={jsonFavs}
            />
        } else if (props.pageNum === 2) {
            return (
                <Favorites
                    favArray={jsonFavs}
                    modalInfo={modal}
                    closeModal={() => setModal({ ...modal, modalView: false })}
                    onFavChangeModal={(boolean, foodName) => { boolean ? changeFavs([...jsonFavs, foodName]) : changeFavs(jsonFavs.filter((food) => !(food === foodName))); setModal({ ...modal, modalFav: boolean }); favChange(boolean, foodName); }}
                    onFavChange={(boolean, foodName) => { boolean ? changeFavs([...jsonFavs, foodName]) : changeFavs(jsonFavs.filter((food) => !(food === foodName))); favChange(boolean, foodName) }}
                    menu={todaysMenu}
                    style={{ flex: 9 }}
                    onFoodPress={(foodName, favorite) => onFoodPress(foodName, favorite)}
                    favClear={() => getFavs()}

                />)
        } else if (props.pageNum === 3) {
            return <Settings updateMenu={() => updateMenu()} menuDate={menuDate} style={{ flex: 9 }} />
        } else {
            return <FoodPage style={{ flex: 9 }} foodItem={food} onBack={() => props.changePage(1)} />
        }



}