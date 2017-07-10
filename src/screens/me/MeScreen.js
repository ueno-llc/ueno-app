import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import { withApollo } from 'react-apollo';
import { startSplashScreen } from 'screens';
import { PRIMARY_COLOR_TEXT } from 'theme';

@inject('user')
@observer
@withApollo
export default class MeScreen extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setOnNavigatorEvent: PropTypes.func,
    }).isRequired,
    user: PropTypes.shape({
      signOut: PropTypes.func,
    }).isRequired,
    client: PropTypes.shape({
      resetStore: PropTypes.func,
    }).isRequired,
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Sign out',
      id: 'sign-out',
      buttonColor: PRIMARY_COLOR_TEXT,
    }],
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  @autobind
  onNavigatorEvent(e) {
    if (e.type === 'NavBarButtonPress' && e.id === 'sign-out') {
      this.props.user.signOut()
        .then(startSplashScreen)
        .then(() => {
          // clear data from client cache
          this.props.client.resetStore();
        });
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
