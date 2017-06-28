import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigator, { Spacer } from 'native-navigation';
import { Dimensions, StyleSheet, VirtualizedList, Image, View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react/native';
import { autobind } from 'core-decorators';
import articlesQuery from 'queries/articles.gql';

@observer
@graphql(articlesQuery, { name: 'articles' })
export default class Articles extends Component {

  static propTypes = {
    articles: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object, // eslint-disable-line
      articles: PropTypes.array, // eslint-disable-line
      refetch: PropTypes.func,
    }).isRequired,
  }

  /**
   * Fired on every scroll event inside list
   * @todo Create parallax effect for images on scroll
   */
  @autobind
  onScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y; // eslint-disable-line
  }

  @autobind
  renderItem({ item }) {
    return (
      <View>
        <Image
          source={{ uri: `https:${item.image}` }}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      articles = [],
      loading,
      refetch,
    } = this.props.articles;

    return (
      <Navigator.Config
        hidden={false}
        title="Articles"
        backgroundColor="#FFFFFF"
      >
        <View style={{ flex: 1 }}>
          <Spacer animated />
          <VirtualizedList
            data={articles}
            renderItem={this.renderItem}
            // onScroll={this.onScroll}
            getItemCount={data => data.length}
            getItem={(data, i) => data[i]}
            keyExtractor={item => item.id}
            refreshing={loading}
            onRefresh={refetch}
          />
        </View>
      </Navigator.Config>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  image: {
    width,
    height: width * (380 / 300),
  },

  card: {
    padding: 20,
  },

  title: {
    color: '#000000',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 10,
  },

  description: {
    color: '#010101',
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 18,
  },

});
