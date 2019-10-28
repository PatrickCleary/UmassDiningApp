import { AsyncStorage } from 'react-native';



export function createQuery(hallFilter, mealFilter){
    let mealArray = [];
    let hallArray =[];

    let queryArray = [];

    if(mealFilter.length > 0){
        if(mealFilter.includes('Breakfast')) mealArray.push('b');
        if(mealFilter.includes('Lunch' || 'Brunch')) mealArray.push('l');
        if(mealFilter.includes('Dinner')) mealArray.push('d');
        if(mealFilter.includes('Late Night')) mealArray.push('ln');
        if(mealFilter.includes('Grab And Go')) mealArray.push('gg');
    }else{
        mealArray = ['b', 'l', 'd', 'ln', 'gg'];
    }
    if(hallFilter.length > 0){
        if(hallFilter.includes('Berkshire')) hallArray.push('b');
        if(hallFilter.includes('Hampshire')) hallArray.push('h');
        if(hallFilter.includes('Franklin')) hallArray.push('f');
        if(hallFilter.includes('Worcester')) hallArray.push('w');
    }else{
        hallArray = ['b', 'h', 'f', 'w'];
    }
    hallArray.forEach((ha)=>{
        mealArray.forEach((ma)=>{
            queryArray.push(ha.concat(ma));
            
        })

    })
    return queryArray;



}


export function getCorrectDate(){

    
    function getCorrectMonth(){
        let month=   parseInt(new Date().getMonth());
           month = month+1;
           if(month<10)
           
           return '0'+month.toString();
           else return month.toString();
       }
       function getCorrectDay(){
           let day = parseInt(new Date().getDate());
           if(day<10){
               return '0' + day.toString();
           }
           else return day.toString();
       }

       return new Date().getFullYear()+getCorrectMonth()+getCorrectDay();
            
}


export function arrayToString(array) {

    var string = ''
    var uniqueArray = [...new Set(array)];
    for (let x = 0; x < uniqueArray.length; x++) {
        var hall = '';
        switch (uniqueArray[x]) {
            case 'Hampshire':
                hall = 'Hamp';
                break;
            case 'Berkshire':
                hall = 'Berk';
                break;
            case 'Franklin':
                hall = 'Frank';
                break;
            default:
                hall = 'Worcester';
        }

        if(!string.includes(hall)){
        if (x < uniqueArray.length - 1)
            
            string = string.concat(hall + ', ');
        else
            string = string.concat(hall);
        }
    }
    return string;

}

export function arrayToStringMeal(array) {

    var string = ''

    for (let x = 0; x < array.length; x++) {
        var hall = '';


        if (x < array.length - 1)
            string = string.concat(array[x] + ', ');
        else
            string = string.concat(array[x]);

    }
    return string;

}

export async function isFavorite(food) {


    const oldFaves = await AsyncStorage.getItem('favoritesArray');
    let favsArray = JSON.parse(oldFaves);


    for (let x = 0; x < favsArray.length; x++) {

        if (favsArray[x] === food) {
            return true;
        }
    }
    return false;



}

//I acknowledge this is a disgusting function but i dont care:
export function fixString(string){
var returnSt= string
    if (string.includes('\'')) {

        var word = string.split(/[']/g);
        var next = '';
        if(word.length>1){
        for(let x = 0; x< word.length-1; x++){
            next = next.concat(word[x]).concat('\\\'');
        }
        if(word[word.length-1].includes('\’'))
            next = next.concat(word[word.length-1].concat('\\\''));
        else
            next = next.concat(word[word.length-1]);

    }else{

        next =  next.concat(word[0]).concat('\\\'');

    }
        string = next;
    
    }
if(string.includes('\"')){
    
        var word = string.split(/["]/g);
    
        var next = '';
        if(word.length>1){
        for(let x = 0; x< word.length-1; x++){
            next = next.concat(word[x]).concat('\\\"');
        }
        if(word[word.length-1].includes('\"'))
            next = next.concat(word[word.length-1].concat('\\\"'));
        else
            next = next.concat(word[word.length-1]);
    }else{
        next =  next.concat(word[0]).concat('\\\"');
    }
        
    string = next;
    

    
}
if(string.includes('\’')){
    
    var word = string.split(/[’]/g);
    var next = '';
    if(word.length>1){
    for(let x = 0; x< word.length-1; x++){
        next = next.concat(word[x]).concat('\\\'');
    }
    
        if(word[word.length-1].includes('\’'))
        next = next.concat(word[word.length-1].concat('\\\''));
        else
        next = next.concat(word[word.length-1]);
}else{
   next =  next.concat(word[0]).concat('\\\'');
}
    
string = next;



}
return string;

}