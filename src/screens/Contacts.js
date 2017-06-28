import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { Platform, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { graphql } from 'react-apollo';
import { observer } from 'mobx-react/native';
import articlesQuery from 'queries/articles.gql';

@observer
@graphql(articlesQuery, { name: 'articles' })
export default class Contacts extends Component {

  state = {
    hidden: false,
  }

  render() {
    console.log(this.props.articles);
    const { hidden } = this.state;
    const marginTop = (Platform.OS === 'android' && !hidden) ? 56 : 0;
    return (
      <Navigator.Config
        title={hidden ? 'hidden' : 'ueno.'}
        hidden={hidden}
        elevation={5}
        backgroundColor="#fff"
      >
        <View style={[styles.container, { marginTop }]}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>Contacts will appear here, in the meantime, try toggling the navbar</Text>
          <TouchableOpacity onPress={() => this.setState({ hidden: !hidden })}>
            <Text>Toggle hidden</Text>
          </TouchableOpacity>
        </View>
      </Navigator.Config>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 56,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
