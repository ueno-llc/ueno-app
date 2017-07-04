/* eslint no-console: 0 */
import { Platform, AlertIOS, ToastAndroid } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { computed, observable } from 'mobx';
import { autobind } from 'core-decorators';

const SIGN_IN_TIMEOUT = 60 * 1000;

export default class User {

  async setup() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        // TODO: Move this into dotenv and load on runtime with react-native-config etc.
        iosClientId: '***REMOVED***',
        webClientId: '***REMOVED***',
        offlineAccess: false,
      });
      this.user = await GoogleSignin.currentUserAsync();
      this.ensureAuthenticated();
    } catch (err) {
      console.log('Play services error %o %o', err.code, err.message);
    }
  }

  @observable
  user = null;

  @computed
  get isSignedIn() {
    const isSignedIn = !!this.user;
    return isSignedIn;
  }

  @computed
  get isValidOrganization() {
    const { email = '' } = this.user || {};
    const isValid = email.indexOf('ueno.co') >= 0;
    return isValid;
  }

  @autobind
  async ensureAuthenticated() {
    if (this.isSignedIn && !this.isValidOrganization) {
      this.revokeAccess();
      if (Platform.OS === 'ios') {
        AlertIOS.alert('Error signing in', 'Not in the ueno.co organization');
      } else if (Platform.OS === 'android') {
        ToastAndroid.show('Error: Not in the ueno.co organization.');
      }
    }
  }

  @autobind
  async signIn() {
    if (Platform.OS === 'android') {
      // Sometimes android doesn't trigger a callback after GoogleSignin.signin() so we need
      // to manually check if signed in.
      this.checkSignInTimestamp = new Date();
      this.onCheckSignIn();
    }
    this.user = await GoogleSignin.signIn();
    this.ensureAuthenticated();
  }

  @autobind
  async onCheckSignIn() {
    const hasTimeoutOut = (this.checkSignInTimestamp - SIGN_IN_TIMEOUT) > new Date();
    if (this.isSignedIn || hasTimeoutOut) {
      return;
    }
    this.user = await GoogleSignin.currentUserAsync();
    if (!this.user) {
      // Check again in 2 seconds
      setTimeout(this.onCheckSignIn, 2000);
    } else {
      this.ensureAuthenticated();
    }
  }

  @autobind
  async signOut() {
    await GoogleSignin.signOut();
    this.user = null;
  }

  @autobind
  async revokeAccess() {
    await GoogleSignin.revokeAccess();
    this.signOut();
  }
}
