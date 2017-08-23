import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { PRIMARY_COLOR } from 'theme';

export default class Error extends Component {

  render() {
    return (
      <View style={styles.error}>
        <Text style={styles.error__text}>We are having trouble, please be kind and patient it will come back soon.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 64,
  },

  error__text: {
    paddingTop: 60,
    paddingHorizontal: 60,

    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
