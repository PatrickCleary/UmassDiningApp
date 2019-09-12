import { AsyncStorage } from 'react-native';




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