import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      me: PropTypes.object, // eslint-disable-line
    }).isRequired,
  }

  render() {
    const { me, error, loading } = this.props.me;
    return (
      <View style={{ marginBottom: 20 }}>
        <Text>
          {loading && 'Loading...'}
          {error && error.message}
          {me && me.email}
        </Text>
      </View>
    );
  }
}
