var fetch = require('node-fetch')




function getCorrectDate(){

    
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


async function updateMenu() {

    let date = getCorrectDate();
console.log(date);
    const query = "SELECT * FROM todaysMenu" + date + ';';
    const data = { query: query }

    const url = 'http://diningapphost.online/requestData.php'
    const body = { method: 'POST', body: JSON.stringify(data) };
    try {
        let response = await fetch(url, body)
        let responseJSON = await response.json()
       console.log(responseJSON)
    }
    catch (error) { console.error(error) };
}

updateMenu();