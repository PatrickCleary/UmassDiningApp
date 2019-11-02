var fetch = require('node-fetch')

fetch('http://diningapphost.online/saveUser.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      username:'\'chunges\'',
  
      token:'\'hello worlds\'',
  
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
  
  // Showing response message coming from server after inserting records.
  console.log(responseJson)
        }).catch((error) => {
          console.error(error);
        });
   
   
    