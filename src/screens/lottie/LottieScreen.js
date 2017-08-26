import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

export default class LottieScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>LOTTIE_SCREEN</Text>
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
