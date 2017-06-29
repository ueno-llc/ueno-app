/* eslint no-console: 0 */
import { Platform } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { computed, observable } from 'mobx';
import { autobind } from 'core-decorators';

const SIGN_IN_TIMEOUT = 60 * 1000;

export default class User {

  async setup() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '***REMOVED***',
        webClientId: '***REMOVED***',
        offlineAccess: false,
      });
      this.user = await GoogleSignin.currentUserAsync();
    } catch (err) {
      console.log('Play services error %o %o', err.code, err.message);
    }
  }

  @observable
  user = null;

  @computed
  get isSignedIn() {
    return !!this.user;
  }

  @autobind
  async signIn() {
    console.log('sign in');
    if (Platform.OS === 'android') {
      // Sometimes android doesn't trigger a callback after GoogleSignin.signin() so we need
      // to manually check if signed in.
      this.checkSignInTimestamp = new Date();
      this.onCheckSignIn();
    }
    this.user = await GoogleSignin.signIn();
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
    }
  }

  @autobind
  async signOut() {
    await GoogleSignin.signOut();
    this.user = null;
  }
}
