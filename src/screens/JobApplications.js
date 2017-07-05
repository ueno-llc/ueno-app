import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, VirtualizedList, View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { autobind } from 'core-decorators';
import jobsQuery from 'queries/jobs.gql';

const jobsOptions = {
  name: 'jobs',
  options: {
    variables: {
      limit: 5,
    },
    fetchPolicy: 'network-only',
  },
};

const TITLE = 'Job Applications';

@graphql(jobsQuery, jobsOptions)
export default class JobApplications extends Component {

  static propTypes = {
    jobs: PropTypes.shape({
      applications: PropTypes.object,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      fetchMore: PropTypes.func,
    }).isRequired,
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
    }).isRequired,
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setTitle({ title: TITLE });
  }

  @autobind
  onEndReached() {
    const { fetchMore, applications } = this.props.jobs;

    if (!applications) return;

    const { hasMore, cursor } = applications;

    if (!hasMore) return;

    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return {
          ...previousResult,
          applications: {
            ...fetchMoreResult.applications,
            items: [
              ...previousResult.applications.items,
              ...fetchMoreResult.applications.items,
            ].filter((item, pos, self) => self.findIndex(sitem => sitem.id === item.id) === pos),
          },
        };
      },
    });
  }

  renderItem({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{`${item.email}`}</Text>
        <Text>{item.job.position} - {item.job.location}</Text>
      </View>
    );
  }

  render() {
    const { applications = {}, loading, refetch } = this.props.jobs;
    const { items = [] } = applications;

    return (
      <View style={{ flex: 1 }}>
        <VirtualizedList
          data={items}
          renderItem={this.renderItem}
          getItem={(data, i) => data[i]}
          getItemCount={data => data.length}
          refreshing={loading}
          onRefresh={refetch}
          keyExtractor={item => item.id}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },

  title: {
    color: '#000000',
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    marginBottom: 10,
  },
});
