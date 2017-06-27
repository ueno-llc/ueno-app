import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';

export default class Home extends Component {
  componentDidMount() {
    this.setup();
  }

  onLoginPress() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  async setup() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
      iosClientId: '***REMOVED***',
      offlineAccess: false,
    });
    GoogleSignin.currentUserAsync().then((user) => {
      console.log('USER', user);
    }).done();
  }

  render() {
    return (
      <Navigator.Config
        title="ueno."
        hidden={false}
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>
            List of contacts!
          </Text>
          <TouchableOpacity onPress={this.onLoginPress}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </Navigator.Config>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
