/**
 * @format
 */

import {AppRegistry} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Notification background handler', type, detail);
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
    notifee.stopForegroundService();
  }
});

notifee.registerForegroundService(notification => {
  return new Promise(res => {
    setTimeout(() => {
      notifee.stopForegroundService();
    }, 10000);
  });
});

AppRegistry.registerComponent(appName, () => App);
