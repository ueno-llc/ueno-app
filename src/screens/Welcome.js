import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class Welcome extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>
          Contacts will appear here, in the meantime, try toggling the navbar buddy
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
