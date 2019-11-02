import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'http://diningapphost.online/saveUser.php'

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let tokenValue = await Notifications.getExpoPushTokenAsync();
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  
  
  
return fetch('http://diningapphost.online/saveUser.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
  
      username:'\'Patrick\'',
  
      token:'\''+ tokenValue+'\''
  
  
    })
  
  }).then((response) => response.json())
        .then((responseJson) => {
  
  // Showing response message coming from server after inserting records.
  console.log('hello', responseJson)
        }).catch((error) => {
          console.error(error);
        });
    }