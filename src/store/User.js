/* eslint no-console: 0 */
import { GoogleSignin } from 'react-native-google-signin';
import { computed, observable } from 'mobx';

export default class User {

  constructor() {
    this.setup();
  }

  async setup() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '***REMOVED***',
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

  async signIn() {
    this.user = await GoogleSignin.signIn();
  }

  async signOut() {
    await GoogleSignin.signOut();
    this.user = null;
  }
}
