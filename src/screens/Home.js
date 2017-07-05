/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    navigator: PropTypes.shape({
      push: PropTypes.func,
      setOnNavigatorEvent: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    this.props.user.setup();
    // Set as root navigator
    this.props.ui.navigator = this.props.navigator;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (e) => {
    if (e.type === 'ScreenChangedEvent' && e.id === 'didAppear') {
      // Always start the app with this screen if it was the last shown screen
      this.props.ui.screen = { screen: 'Home' };
    }
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

  @observable
  height = new Animated.Value(0);

  @observable
  opacity = new Animated.Value(0);

  render() {
    const { height, opacity } = this;
    const { ui } = this.props;
    const { isValidOrganization, isSignedIn, signOut, signIn } = this.props.user;
    return (
      <View style={styles.background} onLayout={this.onLayout}>
        <Animated.View style={[styles.container, { height }]}>
          <Animated.View style={{ opacity, flex: 1 }}>
            <Text style={styles.logo}>ueno.</Text>
            <Text style={styles.subtitle}>internal app</Text>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {isSignedIn && isValidOrganization ? (
                <View>
                  <Me />
                  <Button onPress={() => ui.push({ screen: 'Articles' })}>ARTICLES</Button>
                  <Button onPress={() => ui.push({ screen: 'Contacts' })}>CONTACTS</Button>
                  <Button onPress={() => ui.push({ screen: 'JobApplications' })}>JOB APPLICATIONS</Button>
                  <Button onPress={signOut}>SIGN OUT</Button>
                </View>
              ) : (
                <Button onPress={signIn}>SIGN IN</Button>
              )}
            </View>
          </Animated.View>
        </Animated.View>
        <View style={styles.version}>
          <Text style={styles.versionLabel}>ueno. {ui.appVersionString}</Text>
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
