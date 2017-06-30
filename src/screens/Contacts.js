import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default class Contacts extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Contacts will appear here, in the meantime, try toggling the navbar buddy</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text>Toggle hidden</Text>
        </TouchableOpacity>
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
