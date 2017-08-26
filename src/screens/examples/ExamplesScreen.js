import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'components/button';
import {
  JOB_APPLICATIONS_SCREEN,
  CONTACT_FORMS_SCREEN,
  WEBSITE_UPTIMES_SCREEN,
} from 'screens';
import { PRIMARY_COLOR_TEXT } from 'theme';

export default class ExamplesScreen extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static navigatorStyle = {
    navBarButtonColor: PRIMARY_COLOR_TEXT,
  }
  onJobApplicationsPress = () => {
    this.props.navigator.push({
      screen: JOB_APPLICATIONS_SCREEN,
    });
  }

  onContactFormsPress = () => {
    this.props.navigator.push({
      screen: CONTACT_FORMS_SCREEN,
    });
  }

  onWebsiteUptimesPress = () => {
    this.props.navigator.push({
      screen: WEBSITE_UPTIMES_SCREEN,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>EXAMPLES_SCREEN</Text>

        <View style={{ height: 50 }} />

        <Button onPress={this.onJobApplicationsPress}>Job Applications</Button>
        <Button onPress={this.onContactFormsPress}>Contact Forms</Button>
        <Button onPress={this.onWebsiteUptimesPress}>Website Uptimes</Button>
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
