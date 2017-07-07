
/* eslint global-require: 0 */
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'screens/splash';
import PublicScreen from 'screens/public';
import BusinessScreen from 'screens/business';
import JobApplicationsScreen, { JobApplicationsDetailScreen } from 'screens/job-applications';
import ContactFormsScreen, { ContactFormsDetailScreen } from 'screens/contact-forms';
import ArticlesScreen, { ArticlesDetailScreen } from 'screens/articles';
import MeScreen from 'screens/me';
import { PRIMARY_COLOR } from 'theme';

// Contains screen modules
const Screens = new Map();

// Create unique const screen keys
export const SPLASH_SCREEN = 'ueno.SplashScreen';
export const PUBLIC_SCREEN = 'ueno.PublicScreen';
export const BUSINESS_SCREEN = 'ueno.BusinessScreen';
export const JOB_APPLICATIONS_SCREEN = 'ueno.JobApplicationsScreen';
export const JOB_APPLICATIONS_DETAIL_SCREEN = 'ueno.JobApplicationsDetailScreen';
export const CONTACT_FORMS_SCREEN = 'ueno.ContactFormsScreen';
export const CONTACT_FORMS_DETAIL_SCREEN = 'ueno.ContactFormsDetailScreen';
export const ARTICLES_SCREEN = 'ueno.ArticlesScreen';
export const ARTICLES_DETAIL_SCREEN = 'ueno.ArticlesDetailScreen';
export const ME_SCREEN = 'ueno.MeScreen';

// Map screen consts to their representive module
Screens.set(SPLASH_SCREEN, () => SplashScreen);
Screens.set(PUBLIC_SCREEN, () => PublicScreen);
Screens.set(BUSINESS_SCREEN, () => BusinessScreen);
Screens.set(JOB_APPLICATIONS_SCREEN, () => JobApplicationsScreen);
Screens.set(JOB_APPLICATIONS_DETAIL_SCREEN, () => JobApplicationsDetailScreen);
Screens.set(CONTACT_FORMS_SCREEN, () => ContactFormsScreen);
Screens.set(CONTACT_FORMS_DETAIL_SCREEN, () => ContactFormsDetailScreen);
Screens.set(ARTICLES_SCREEN, () => ArticlesScreen);
Screens.set(ARTICLES_DETAIL_SCREEN, () => ArticlesDetailScreen);
Screens.set(ME_SCREEN, () => MeScreen);

// Start private screen as tab based app
/* eslint-disable import/no-unresolved */
export const startPrivateScreen = () =>
  Navigation.startTabBasedApp({
    tabs: [{
      label: 'Ueno.',
      screen: ARTICLES_SCREEN,
      title: 'Ueno.',
      icon: require('../assets/images/home.png'),
      selectedIcon: require('../assets/images/home-active.png'),
    }, {
      label: 'Business',
      screen: BUSINESS_SCREEN,
      title: 'Business',
      icon: require('../assets/images/business.png'),
      selectedIcon: require('../assets/images/business-active.png'),
    }, {
      label: 'Me',
      screen: ME_SCREEN,
      title: 'Me',
      icon: require('../assets/images/user.png'),
      selectedIcon: require('../assets/images/user-active.png'),
    }],
    tabsStyle: {
      tabBarButtonColor: '#8E8E93',
      tabBarLabelColor: '#8E8E93',
      tabBarSelectedButtonColor: PRIMARY_COLOR,
      tabBarSelectedLabelColor: PRIMARY_COLOR,
      tabBarBlur: true,
      tabBarHideShadow: true,
    },
  });
/* eslint-enable import/no-unresolved */

// Start public screen as single screen app
export const startPublicScreen = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: PUBLIC_SCREEN,
      navigatorStyle: {
        navBarHidden: false,
      },
    },
  });

// Start splash screen as single screen app
export const startSplashScreen = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: SPLASH_SCREEN,
      navigatorStyle: {
        navBarHidden: true,
      },
    },
  });

export default Screens;
