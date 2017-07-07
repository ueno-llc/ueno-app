import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class PublicScreen extends Component {

  render() {
    return (
      <View style={styles.container}>

        <Text>PUBLIC_SCREEN</Text>
        <Text>List of publically accessible menu items</Text>

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
