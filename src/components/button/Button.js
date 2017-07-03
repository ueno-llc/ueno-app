import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends Component {

  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    onPress: () => {},
  };

  render() {
    const { children, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.label}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#00E2AD',
    borderRadius: 3,
  },

  label: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
