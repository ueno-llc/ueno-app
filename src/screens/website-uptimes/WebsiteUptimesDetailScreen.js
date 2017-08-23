import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import WebsiteDetailsQuery from 'queries/websiteDetails.gql';

const queryOptions = {
  name: 'data',
  options: ({ item }) => ({
    variables: {
      id: item.id,
    },
  }),
};

@graphql(WebsiteDetailsQuery, queryOptions)
export default class WebsiteUptimesDetailScreen extends Component {

  static propTypes = {
    data: PropTypes.shape({
      websiteDetails: PropTypes.shape({
        id: PropTypes.string,
        testType: PropTypes.string,
        paused: PropTypes.bool,
        contactGroups: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          email: PropTypes.string,
        }),
        status: PropTypes.string,
        uptime: PropTypes.number,
        checkRate: PropTypes.number,
        timeout: PropTypes.number,
        logoImage: PropTypes.string,
        lastTested: PropTypes.string,
        processing: PropTypes.bool,
        processingState: PropTypes.string,
        downTimes: PropTypes.string,
      }),
      loading: PropTypes.bool,
    }).isRequired,
  }

  render() {
    const { websiteDetails, loading } = this.props.data;
    console.log('websiteDetails', websiteDetails);

    return (
      <View style={styles.container}>
        <Text>website uptimes list</Text>
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
