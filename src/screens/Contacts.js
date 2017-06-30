import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const TITLE = 'Contacts';

export default class Contacts extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
      toggleNavBar: PropTypes.func,
    }).isRequired,
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setTitle({ title: TITLE });
    navigator.setSubTitle({ subtitle: 'Work in progress' });
  }

  toggleNavBar = () => {
    this.props.navigator.toggleNavBar({ to: this.isHidden ? 'shown' : 'hidden' });
    this.isHidden = !this.isHidden;
  }

  isHidden = false;

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 20 }}>Contacts will appear here, in the meantime, try toggling the navbar buddy</Text>
        <TouchableOpacity onPress={this.toggleNavBar}>
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
