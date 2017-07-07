import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { observable } from 'mobx';
import Button from 'components/button';
import { startPrivateScreen, startPublicScreen } from 'screens';
import { autobind } from 'core-decorators';

@inject('user')
@observer
export default class SplashScreen extends Component {

  static propTypes = {
    user: PropTypes.shape({
      signIn: PropTypes.func,
      isSignedIn: PropTypes.bool,
    }).isRequired,
  };

  @autobind
  async onSignInPress() {
    const isSignedIn = await this.props.user.signIn();
    this.isSignInLoading = true;
    if (isSignedIn) {
      setTimeout(() => {
        startPrivateScreen();
        this.isSignInLoading = false;
      }, 2000);
    } else {
      Alert.alert('Could not sign in', 'Sorry');
      this.isSignInLoading = false;
    }
  }

  onGuestPress() {
    startPublicScreen();
  }

  @observable
  isSignInLoading = false;

  render() {
    return (
      <View style={styles.container}>

        <Text>SPLASH_SCREEN</Text>
        <View style={{ height: 50 }} />

        <Button onPress={this.onSignInPress}>{this.isSignInLoading ? 'Signing in...' : 'Sign in'}</Button>
        <Button onPress={this.onGuestPress}>Guest</Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
