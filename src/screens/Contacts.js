import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { Platform, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Posts from 'components/posts';

export default class Contacts extends Component {

  state = {
    hidden: false,
  }

  render() {
    const { hidden } = this.state;
    const marginTop = (Platform.OS === 'android' && !hidden) ? 56 : 0;
    return (
      <Navigator.Config
        title={hidden ? 'hidden' : 'ueno.'}
        hidden={hidden}
        elevation={5}
        backgroundColor="#fff"
      >
        <View style={[styles.container, { marginTop }]}>
          <Posts />
          <TouchableOpacity onPress={() => this.setState({ hidden: !hidden })}>
            <Text>Toggle hidden</Text>
          </TouchableOpacity>
        </View>
      </Navigator.Config>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 56,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
