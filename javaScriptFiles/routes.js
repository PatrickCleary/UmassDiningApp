//const fetch = require('node-fetch');
const request = require('request');

Insert_Data_Into_MySQL();




function Insert_Data_Into_MySQL() {
  const head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const data = {
    food: '\'chocolate\'',

    hall: '\'hamp\'',

    meal: '\'dinner\'',

    category: '\'entrees\'',
  }

  const url = 'https://diningapphost.000webhostapp.com/insertFood.php'
  const body = { method: 'POST', body: JSON.stringify(data), headers: head };
  fetch(url, body).then(response => response.text()).then(response => console.log('Success:' + JSON.stringify(response)))
    .catch(error => console.error('Error:' + error));
}

