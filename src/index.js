/* eslint global-require: 0 */
import { Navigation } from 'react-native-navigation';
import registerConnectedScreen from './utils/registerConnectedScreen';
import Home from './screens/Home';
import Articles from './screens/Articles';
import Contacts from './screens/Contacts';
import JobApplications from './screens/JobApplications';

registerConnectedScreen('Home', () => Home);
registerConnectedScreen('Articles', () => Articles);
registerConnectedScreen('JobApplications', () => JobApplications);

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
