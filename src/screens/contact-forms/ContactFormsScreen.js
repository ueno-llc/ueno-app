import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, View, Text, Image, TouchableOpacity } from 'react-native';
import { graphql } from 'react-apollo';
import { observer, inject } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import contactsQuery from 'queries/contacts.gql';
import { CONTACT_FORMS_DETAIL_SCREEN } from 'screens';

const contactsOptions = {
  name: 'contacts',
  options: {
    variables: {
      limit: 20,
    },
    fetchPolicy: 'network-only',
  },
};

@inject('ui')
@observer
@graphql(contactsQuery, contactsOptions)
export default class ContactScreen extends Component {

  static propTypes = {
    contacts: PropTypes.shape({
      contacts: PropTypes.object,
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      fetchMore: PropTypes.func,
    }).isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  }

  @autobind
  onEndReached() {
    const { fetchMore, contacts } = this.props.contacts;

    if (!contacts) return;

    const { hasMore, cursor } = contacts;

    if (!hasMore) return;

    fetchMore({
      variables: {
        after: cursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return {
          ...previousResult,
          contacts: {
            ...fetchMoreResult.contacts,
            items: [
              ...previousResult.contacts.items,
              ...fetchMoreResult.contacts.items,
            ].filter((item, pos, self) => self.findIndex(sitem => sitem.id === item.id) === pos),
          },
        };
      },
    });
  }

  @autobind
  renderItem({ item }) {

    const onPress = () => this.props.navigator.push({
      screen: CONTACT_FORMS_DETAIL_SCREEN,
      title: item.name,
      passProps: { item },
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
          <View style={styles.itemAvatar}>
            <Image style={styles.itemAvatarImage} source={{ uri: item.avatarUrl }} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name.toString()}</Text>
            <Text style={styles.itemEmail}>{item.email.toString()}</Text>
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
    const { contacts = {} } = this.props.contacts;
    const { items = [] } = contacts;

    // Group items by Date.toDateString
    const dateGroups = items.reduce((acc, item) => {
      const date = (new Date(+item.created)).toDateString();
      (acc[date] || (acc[date] = [])).push(item);
      return acc;
    }, {});

    // Map to SectionList compatible array
    const sections = Object.entries(dateGroups)
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
          onEndReached={this.onEndReached}
        />
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

  itemName: {
    fontWeight: '700',
    fontSize: 14,
    paddingBottom: 1,
  },

  itemEmail: {
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
