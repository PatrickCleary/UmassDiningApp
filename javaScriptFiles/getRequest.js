const fetch = require('node-fetch');
//const request = require('request'); 

Insert_Data_Into_MySQL();



async function saveData(todaysMenu) {

  try {


    const favString = AsyncStorage.getItem('favoritesArray');
    const favArray = JSON.parse(favString);

    for (let i = 0; i < todaysMenu.length; i++) {


      todaysMenu[i].favorite = false;

      for (let x = 0; x < favArray.length; x++) {
        if (todaysMenu[i].food === favArray[x].foodName) {
          todaysMenu[i].favorite = true;
        }
      }

    }

    let JSONString = JSON.stringify(todaysMenu);
    console.log(JSONString);
    AsyncStorage.setItem('todaysMenu', JSONString);



  } catch (error) {
    console.log(error);
  }

}




function Insert_Data_Into_MySQL() {
  const head = {
    //'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  }

  const query = "SELECT * FROM todaysMenu;"
  const data = { query: query }

  const url = 'http://diningapphost.online/requestData.php'
  const body = { method: 'POST', body: JSON.stringify(data), headers: head };
  fetch(url, body).then(response => response.json()).then(responseJSON => saveData(responseJSON))
    .catch(error => console.log('Error:' + error));
}

