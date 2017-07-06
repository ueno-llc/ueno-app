import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, View, Text, Image } from 'react-native';
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
      <View style={styles.item}>
        <View style={styles.itemAvatar}>
          <Image style={styles.itemAvatarImage} source={{ uri: item.avatarUrl }} />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{`${item.email}`}</Text>
          <Text>{item.job.position} - {item.job.location}</Text>
        </View>
      </View>
    );
  }

  renderSectionHeader({ section }) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
    );
  }

  render() {
    const { applications = {}, loading, refetch } = this.props.jobs;
    const { items = [] } = applications;

    const groups = items.reduce((obj, item) => {
      const date = (new Date(+item.created)).toDateString();
      (obj[date] || (obj[date] = [])).push(item);

      return obj;
    }, {});

    const sections = Object.entries(groups)
      .map(([title, data]) => ({ title, data }));

    return (
      <View style={{ flex: 1 }}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
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

  item: {
    padding: 10,
    flexDirection: 'row',
  },

  itemAvatar: {
    paddingRight: 10,
  },

  itemAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  itemDetails: {
    flexDirection: 'column',
    flex: 1,
  },

  itemTitle: {
    color: '#000000',
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    marginBottom: 10,
  },

  section: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },

  sectionTitle: {
    fontSize: 13,
    color: '#444444',
  },
});
