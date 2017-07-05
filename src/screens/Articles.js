import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, StyleSheet, VirtualizedList, Image, View, Text, Linking, TouchableOpacity } from 'react-native';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { autobind } from 'core-decorators';
import articlesQuery from 'queries/articles.gql';

const { width, height } = Dimensions.get('window');

const articlesOptions = {
  name: 'articles',
  options: {
    variables: {
      offset: 0,
      limit: 2,
    },
    fetchPolicy: 'network-only',
  },
};

@observer
@graphql(articlesQuery, articlesOptions)
export default class Articles extends Component {

  static propTypes = {
    articles: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object, // eslint-disable-line
      articles: PropTypes.array, // eslint-disable-line
      refetch: PropTypes.func,
      fetchMore: PropTypes.func,
    }).isRequired,
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
    }).isRequired,
  }

  state = {
    scrollY: new Animated.Value(0),
  }

  componentDidMount() {
    const { navigator } = this.props;
    navigator.setTitle({ title: 'Articles' });
  }

  @autobind
  onEndReached() {
    const { fetchMore, articles } = this.props.articles;
    if (!articles) return;
    fetchMore({
      variables: {
        offset: articles.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }
        return {
          ...previousResult,
          articles: [...previousResult.articles, ...fetchMoreResult.articles]
          .filter((item, pos, self) => self.findIndex(sitem => sitem.id === item.id) === pos),
        };
      },
    });
  }

  @observable
  items = new Map();

  @autobind
  renderItem({ item, index }) {

    const topOffset = Array.from(this.items.values()).slice(0, index).reduce((a, b) => a + b, 0);
    const inputRange = [topOffset - height, topOffset];
    const onPress = () => Linking.canOpenURL(item.url)
      .then(isSupported => isSupported && Linking.openURL(item.url));

    if (index === 0) {
      // We have no height for first item.
      // Let's just assume it.
      inputRange[0] = -height;
      inputRange[1] = height;
    }

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View onLayout={e => this.items.set(index, e.nativeEvent.layout.height)}>
          <View style={{ height: width, overflow: 'hidden' }}>
            <Animated.View
              style={{
                top: this.state.scrollY.interpolate({
                  inputRange,
                  outputRange: [0, -100],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <Image
                source={{ uri: `https:${item.image}` }}
                resizeMode="contain"
                style={styles.image}
              />
            </Animated.View>
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      articles = [],
      // loading,
      // refetch,
    } = this.props.articles;

    return (
      <View style={{ flex: 1 }}>
        <VirtualizedList
          data={articles}
          renderItem={this.renderItem}
          onScroll={Animated.event([{
            nativeEvent: { contentOffset: { y: this.state.scrollY } },
          }])}
          getItemCount={data => data.length}
          getItem={(data, i) => data[i]}
          keyExtractor={item => item.id}
          // refreshing={loading}
          // onRefresh={refetch}
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

  image: {
    width,
    height: width * (380 / 300),
  },

  card: {
    padding: 20,
    backgroundColor: '#FFFFFF',
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
