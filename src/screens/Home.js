/* eslint no-console: 0 */
import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { StyleSheet, Text, Animated, View, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import { autobind } from 'core-decorators';
import codePush from 'react-native-code-push';

@observer
export default class Home extends Component {

  componentDidMount() {
    try {
      this.setup();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error Google SignIn', err);
    }

    this.animateScreenIn();

    codePush.getUpdateMetadata().then((update) => {
      if (!update) return;
      this.version = `${update.appVersion} (${update.label}-${update.packageHash.substr(0, 7)})`;
    });
  }

  onContactsPress() {
    Navigator.push('Contacts');
  }

  @autobind
  async onGoogleSignin() {
    this.checkLoginAttempts = 0;
    GoogleSignin.signIn().then(user => (this.user = user));
    this.checkLogin();
  }

  @autobind
  async onGoogleSignout() {
    await GoogleSignin.signOut();
    this.user = null;
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

  animateScreenIn() {
    const { height } = Dimensions.get('window');
    Animated.sequence([
      Animated.timing(this.height, {
        toValue: height - 50,
        easing: Easing.quad,
        duration: 660,
      }),
      Animated.timing(this.opacity, {
        toValue: 1,
        easing: Easing.quad,
        duration: 330,
      }),
    ]).start();
  }

  /**
   * Callback doesn't seem to work on Android.
   * This is a workaround for that edge case.
   * @todo Make sure its working before prod.
   */
  @autobind
  async checkLogin() {
    if (this.user) return;
    this.checkLoginAttempts += 1;
    this.user = await GoogleSignin.currentUserAsync();
    if (this.user) return;
    if (this.checkLoginAttempts < 5) {
      setTimeout(this.checkLogin, 3000);
    } else {
      console.log('Timeout waiting for login');
    }
  }

  @observable user = null;
  @observable height = new Animated.Value(0)
  @observable opacity = new Animated.Value(0)
  @observable version = '~';

  render() {
    const { height, opacity } = this;
    return (
      <View style={styles.background}>
        <Navigator.Config
          backgroundColor="#FFF"
          elevation={0}
          hidden
          onBarHeightChanged={h => console.log('height is %o', h)}
        />
        <Animated.View style={[styles.container, { height }]}>
          <Animated.View style={{ opacity, flex: 1 }}>
            <Text style={styles.logo}>ueno.</Text>
            <Text style={styles.subtitle}>internal app</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {this.user ? (
                <View>
                  <Text style={styles.text}>{this.user.name}</Text>
                  <TouchableOpacity onPress={this.onContactsPress} style={styles.btn}>
                    <Text style={styles.btnLabel}>CONTACTS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onGoogleSignout} style={styles.btn}>
                    <Text style={styles.btnLabel}>SIGN OUT</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity onPress={this.onGoogleSignin} style={styles.btn}>
                  <Text style={styles.btnLabel}>SIGN IN</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </Animated.View>
        <View style={styles.version}>
          <Text style={styles.versionLabel}>ueno-internal-app {this.version}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#00E2AD',
  },

  container: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },

  logo: {
    fontSize: 20,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    letterSpacing: -0.5,
    position: 'absolute',
    top: 45,
    left: 35,
    backgroundColor: 'transparent',
  },

  subtitle: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
    fontWeight: '400',
    color: '#999',
    position: 'absolute',
    top: 70,
    left: 35,
    backgroundColor: 'transparent',
  },

  text: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    marginBottom: 20,
  },

  btn: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#00E2AD',
    borderRadius: 3,
  },

  btnLabel: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  version: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },

  versionLabel: {
    fontSize: 13,
    color: '#FFFFFF',
  },
});
