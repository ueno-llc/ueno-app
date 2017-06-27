import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spacer } from 'native-navigation';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react/native';
import { observable, computed } from 'mobx';
import { View, ListView, StyleSheet, Text } from 'react-native';
import allPostsQuery from 'queries/allPosts.gql';

@observer
@graphql(allPostsQuery, { name: 'posts' })
export default class Posts extends Component {

  static propTypes = {
    posts: PropTypes.shape({
      loading: PropTypes.bool,
      allPosts: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string,
        }),
      ),
    }).isRequired,
  }

  componentWillReceiveProps({ posts }) {
    if (!posts.loading && !posts.error) {
      this.dataSource = this.dataSource.cloneWithRows(posts.allPosts);
    }
  }

  @observable
  dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2) });

  @computed
  get isLoading() {
    return this.props.posts.loading;
  }

  render() {
    if (this.isLoading) {
      return (<Text>Loading</Text>);
    }

    return (
      <View style={styles.container}>
        <Spacer animated />
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={post => (
            <View>
              <Text>{post.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
