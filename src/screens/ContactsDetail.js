/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, Text, ScrollView, View, Linking } from 'react-native';
import { autobind } from 'core-decorators';

export default class ContactsDetail extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
    }).isRequired,
    item: PropTypes.object, // eslint-disable-line
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Reply',
      id: 'reply',
    }],
  };

  componentWillMount() {
    const {
      navigator,
      item,
    } = this.props;

    navigator.setTitle({ title: item.name });
    navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  @autobind
  onNavigatorEvent(e) {
    const { email, message } = this.props.item;
    if (e.type === 'NavBarButtonPress' && e.id === 'reply') {
      const link = `mailto:${email}?body=${encodeURI(message)}`;
      Linking.canOpenURL(link).then((isSupported) => {
        if (isSupported) {
          return Linking.openURL(link);
        }
        return Alert.alert('Could not reply', 'No suitable app found');
      });
    }
  }

  render() {
    const {
      message,
    } = this.props.item;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.message}>
          <Text selectable>{message}</Text>
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  message: {
    flex: 1,
    padding: 28,
  },

});
