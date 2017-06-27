import React, { Component } from 'react';
import Navigator from 'native-navigation';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj4flswof7u7e0157jzu27cy6',
});

const client = new ApolloClient({ networkInterface });

const wrapScreenGetter = (route, getScreen) => {
  class ConnectedScreen extends Component {

    static displayName = `ConnectedScreen(${route})`;

    render() {
      const Screen = getScreen().default;
      return (
        <ApolloProvider client={client}>
          <Screen {...this.props} />
        </ApolloProvider>
      );
    }
  }

  return () => {
    // invoking this here ensures that our original `getScreen` function gets called, which we want
    // to happen to make sure that `Navigator.preload` still does meaningful work.
    getScreen();
    return ConnectedScreen;
  };
};

const registerConnectedScreen = (route, getScreen) =>
  Navigator.registerScreen(route, wrapScreenGetter(route, getScreen));

export default registerConnectedScreen;
