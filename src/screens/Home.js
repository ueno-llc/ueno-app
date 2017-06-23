import React, { Component } from 'react';
import { StyleSheet, Text, Animated, View, TouchableHighlight, Dimensions, Easing } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class Home extends Component {

  state = {
    user: null,
    height: new Animated.Value(0),
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    this.setupGoogleSignin();

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

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '***REMOVED***',
        offlineAccess: false,
      });

      const user = await GoogleSignin.currentUserAsync();
      this.setState({ user });
    }
    catch(err) {
      console.log('Google signin error %o %o', err.code, err.message);
    }
  }

  onContactsPress = () => {
    this.props.navigator.push({
      screen: 'uia.Contacts',
      title: 'Contacts',
    });
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

  render() {
    const { height, opacity, user } = this.state;
    return (
      <View style={styles.background}>
        <Animated.View style={[styles.container, { height }]}>
          <Animated.View style={{ opacity, flex: 1 }}>
            <Text style={styles.logo}>ueno.</Text>
            <Text style={styles.subtitle}>internal app</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {user ? <Text>Hello {user.name}</Text> :
              <GoogleSigninButton
                style={{width: 230, height: 48}}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Light}
                onPress={this.onGoogleSignin}
              />}
            </View>
          </Animated.View>
        </Animated.View>
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

  instructions: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    marginBottom: 20,
  },
  btn: {
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#eaa',
    borderRadius: 5,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
  },
});
