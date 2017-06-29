/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigator from 'native-navigation';
import { inject, observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { StyleSheet, Text, Animated, View, Easing } from 'react-native';

import Me from 'components/me';
import Button from 'components/button';

@inject('user', 'ui')
@observer
export default class Home extends Component {

  static propTypes = {
    user: PropTypes.object, // eslint-disable-line
    ui: PropTypes.object, // eslint-disable-line
  };

  componentDidMount() {
    this.props.user.setup();
  }

  onLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    this.animateScreenIn(height);
  }

  animateScreenIn(height) {
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

  @observable height = new Animated.Value(0)
  @observable opacity = new Animated.Value(0)

  render() {
    const { height, opacity } = this;
    const { ui } = this.props;
    const { isSignedIn, signOut, signIn } = this.props.user;
    return (
      <View style={styles.background} onLayout={this.onLayout}>
        <Navigator.Config
          backgroundColor="#FFF"
          elevation={0}
          hidden
        />
        <Animated.View style={[styles.container, { height }]}>
          <Animated.View style={{ opacity, flex: 1 }}>
            <Text style={styles.logo}>ueno.</Text>
            <Text style={styles.subtitle}>internal app</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {isSignedIn ? (
                <View>
                  <Me />
                  <Button onPress={() => Navigator.push('Articles')}>ARTICLES</Button>
                  <Button onPress={() => Navigator.push('Contacts')}>CONTACTS</Button>
                  <Button onPress={signOut}>SIGN OUT</Button>
                </View>
              ) : (
                <Button onPress={signIn}>SIGN IN</Button>
              )}
            </View>
          </Animated.View>
        </Animated.View>
        <View style={styles.version}>
          <Text style={styles.versionLabel}>ueno-internal-app {ui.appVersionString}</Text>
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

  version: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  versionLabel: {
    fontSize: 13,
    color: '#FFFFFF',
  },
});
