/* eslint max-len: 0 */
import 'utils/reactotron';
import registerConnectedScreen from 'utils/registerConnectedScreen';
import Store from 'store';
import Screens, {
  startPrivateScreen,
  startSplashScreen,
} from 'screens';

const store = new Store();

// Register all screens. Maybe not a good idea, IDK.
Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
  registerConnectedScreen(screenConst, screenModule, store));

// Setup user store
store.user.setup()
.then((isSignedIn) => {
  if (isSignedIn) {
    return startPrivateScreen();
  }
  return startSplashScreen();
});
