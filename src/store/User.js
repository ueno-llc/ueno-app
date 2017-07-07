/* eslint no-console: 0 */
import { Alert } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { computed, observable } from 'mobx';
import { autobind } from 'core-decorators';

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
      return this.ensureAuthenticated();
    } catch (err) {
      console.log('Play services error %o %o', err.code, err.message);
    }
    return false;
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
      await this.revokeAccess();
      Alert.alert('Error signing in', 'Not in the ueno.co organization');
      return false;
    }
    return this.isSignedIn;
  }

  @autobind
  async signIn() {
    // Prompts the Sign In modal and awaits a successful login / or failure.
    this.user = await GoogleSignin.signIn();
    console.log('1. signIn', this.user);
    const isAuthenticationEnsured = await this.ensureAuthenticated();
    console.log('2. isEnsured', isAuthenticationEnsured);
    return isAuthenticationEnsured;
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
