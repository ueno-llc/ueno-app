import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { StyleSheet, Text, Animated, View, TouchableOpacity, Dimensions, Easing } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

export default class Home extends Component {

  state = {
    user: null,
    height: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  componentDidMount() {

    try {
      this.setup();
    } catch (err) {
      console.log('Error Google SignIn', err);
    }

    const { height } = Dimensions.get('window');
    Animated.sequence([
      Animated.timing(this.state.height, {
        toValue: height - 65,
        easing: Easing.quad,
        duration: 660,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        easing: Easing.quad,
        duration: 330,
      }),
    ]).start();
  }

  async setup() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      iosClientId: '***REMOVED***',
      offlineAccess: false,
    });
    this.setState({
      user: await GoogleSignin.currentUserAsync(),
    });
  }

  onContactsPress = () => {
    Navigator.push('Contacts');
  }

  onGoogleSignin = () => {
    GoogleSignin.signIn()
    .then((user) => {
      console.log('User is %o', user);
      this.setState({ user });
    })
    .catch((err) => {
      console.log('WRONG SIGNIN %o', err);
    })
    .done();
  }

  onGoogleSignout = () => {
    GoogleSignin.signOut()
    .then(() => {
      this.setState({
        user: null,
      });
    })
    .catch((err) => {
      console.log('Could not sign out', err);
    });
  }

  render() {
    const { height, opacity, user } = this.state;
    return (
      <Navigator.Config
        title="ueno."
        hidden
        backgroundColor="#FFFFFF"
      >
        <View style={styles.background}>
          <Animated.View style={[styles.container, { height }]}>
            <Animated.View style={{ opacity, flex: 1 }}>
              <Text style={styles.logo}>ueno.</Text>
              <Text style={styles.subtitle}>internal app</Text>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {user ? (
                  <View>
                    <Text style={styles.text}>{user.name}</Text>
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
        </View>
      </Navigator.Config>
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
});
