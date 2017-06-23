import { Navigation } from 'react-native-navigation';
import CodePush from 'react-native-code-push';
import Home from './Home';
import Contacts from './Contacts';

export function registerScreens() {

  const screens = {
    'uia.Home': Home,
    'uia.Contacts': Contacts,
  };

  Object.entries(screens)
  .forEach(([key, ComposedComponent]) =>
    Navigation.registerComponent(key, () => CodePush(ComposedComponent)));
}
