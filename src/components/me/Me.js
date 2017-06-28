import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spacer } from 'native-navigation';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react/native';
import { View, Text } from 'react-native';
import meQuery from 'queries/me.gql';

@observer
@graphql(meQuery, { name: 'me' })
export default class Me extends Component {

  static propTypes = {
    me: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object, // eslint-disable-line
      viewer: PropTypes.object, // eslint-disable-line
    }).isRequired,
  }

  render() {
    const { viewer, error, loading } = this.props.me;
    return (
      <View style={{ marginBottom: 20 }}>
        <Spacer />
        <Text>
          {loading && 'Loading...'}
          {error && error.message}
          {viewer && viewer.me.email}
        </Text>
      </View>
    );
  }
}
