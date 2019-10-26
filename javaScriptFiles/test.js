const fetch = require("node-fetch");

const fs = require('fs');


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

        const query = "SELECT * FROM todaysMenu" + date + ' ORDER BY category, food;';
        const data = { query: query }

        const url = 'http://diningapphost.online/requestData.php'
        const body = { method: 'POST', body: JSON.stringify(data) };
        try {
            let response = await fetch(url, body)
            let responseJSON = await response.json()
            
    // write to a new file named 2pac.txt
fs.writeFile('C:/Users/Patrick/Programming/TestFWNode.txt', JSON.stringify(responseJSON), (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Lyric saved!');
});
        }
        catch (error) { console.error(error) };
 }

updateMenu();