import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, SectionList, TouchableOpacity } from 'react-native';
import { autobind } from 'core-decorators';
import graphql, { withLoadMore } from 'utils/graphql';
import websitesQuery from 'queries/websites.gql';
import { WEBSITE_UPTIMES_DETAIL_SCREEN } from 'screens';
import { COLOR_GREEN, COLOR_RED } from 'theme';
import Error from 'components/error';

@graphql
export default class WebsiteUptimesScreen extends Component {

  static propTypes = {
    websites: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object, // eslint-disable-line
      articles: PropTypes.array, // eslint-disable-line
      refetch: PropTypes.func,
      loadMore: PropTypes.func,
    }).isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  static graphql = {
    query: websitesQuery,
    name: 'websites',
    props(props) {
      return withLoadMore('websites', 'websites', props);
    },
  };

  @autobind
  renderItem({ item }) {
    console.log('item', item);

    const onPress = () => this.props.navigator.push({
      screen: WEBSITE_UPTIMES_DETAIL_SCREEN,
      title: item.name,
      passProps: { item },
    });

    const isUp = item.status === 'Up';

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={[isUp ? styles.itemSubUp : styles.itemSubDown]}>{item.status} - {item.uptime}</Text>
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
    const { websites = [], error, loadMore } = this.props.websites;

    if (error) {
      return <Error />;
    }

    const groups = websites.reduce((obj, item) => {
      const firstLater = item.name.charAt(0).toUpperCase();
      (obj[firstLater] || (obj[firstLater] = [])).push(item);
      return obj;
    }, {});

    const sections = Object.entries(groups)
      .map(([title, data]) => ({ title, data }))
      .sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });

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

  itemSubUp: {
    color: COLOR_GREEN,
  },

  itemSubDown: {
    color: COLOR_RED,
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
