import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, View, Text, Image, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import jobsQuery from 'queries/jobs.gql';
import graphql, { withLoadMore } from 'utils/graphql';
import { JOB_APPLICATIONS_DETAIL_SCREEN } from 'screens';
import Error from 'components/error';

@graphql
export default class JobApplicationsScreen extends Component {

  static propTypes = {
    jobs: PropTypes.shape({
      applications: PropTypes.object,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      loadMore: PropTypes.func,
    }).isRequired,
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
      push: PropTypes.func,
    }).isRequired,
  }

  static graphql = {
    query: jobsQuery,
    name: 'jobs',
    options: {
      variables: {
        limit: 20,
      },
    },
    props(props) {
      return withLoadMore('jobs.applications', 'items', props);
    },
  }

  @autobind
  renderItem({ item }) {
    const onPress = () => this.props.navigator.push({
      screen: JOB_APPLICATIONS_DETAIL_SCREEN,
      title: item.email,
      passProps: { item },
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.itemAvatar}>
            <Image style={styles.itemAvatarImage} source={{ uri: item.avatarUrl }} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{`${item.email}`}</Text>
            <Text style={styles.itemSub}>{item.job.position} - {item.job.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    const { applications = {}, error, loadMore } = this.props.jobs;
    const { items = [] } = applications;

    if (error) {
      return <Error />;
    }

    const groups = items.reduce((obj, item) => {
      const date = (new Date(+item.created)).toDateString();
      (obj[date] || (obj[date] = [])).push(item); // eslint-disable-line
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
          keyExtractor={item => item.id}
          onEndReached={loadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontWeight: '700',
    fontSize: 14,
    paddingBottom: 1,
  },

  itemSub: {
    color: '#333333',
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
