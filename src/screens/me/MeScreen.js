import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import { startSplashScreen } from 'screens';

@inject('user')
@observer
export default class MeScreen extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      signOut: PropTypes.func,
    }).isRequired,
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Sign out',
      id: 'sign-out',
    }],
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  @autobind
  onNavigatorEvent(e) {
    if (e.type === 'NavBarButtonPress' && e.id === 'sign-out') {
      this.props.user.signOut().then(startSplashScreen);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>ME_SCREEN</Text>

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
