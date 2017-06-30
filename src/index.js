/* eslint global-require: 0 */
import { Navigation } from 'react-native-navigation';
import registerConnectedScreen from './utils/registerConnectedScreen';
import Home from './screens/Home';
import Articles from './screens/Articles';
import Contacts from './screens/Contacts';

registerConnectedScreen('Home', () => Home);
registerConnectedScreen('Articles', () => Articles);

Navigation.registerComponent('Contacts', () => Contacts);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'ueno.',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
});
