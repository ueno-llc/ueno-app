/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default class Home extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
    }).isRequired,
    item: PropTypes.object, // eslint-disable-line
  };

  componentWillMount() {
    const {
      navigator,
      item,
    } = this.props;

    navigator.setTitle({ title: item.name });
  }

  render() {
    const {
      message,
    } = this.props.item;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.message}>
          <Text>{message}</Text>
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
