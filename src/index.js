/* eslint global-require: 0 */
import { Navigation } from 'react-native-navigation';
import registerConnectedScreen from './utils/registerConnectedScreen';
import Home from './screens/Home';
import Articles from './screens/Articles';
import Contacts from './screens/Contacts';
import Welcome from './screens/Welcome';

registerConnectedScreen('Home', () => Home);
registerConnectedScreen('Articles', () => Articles);
Navigation.registerComponent('Contacts', () => Contacts);
Navigation.registerComponent('Welcome', () => Welcome);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'Home',
    title: 'ueno.',
  },
});
