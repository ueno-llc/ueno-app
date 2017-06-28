import React, { Component } from 'react';
import Navigator from 'native-navigation';
import codePush from 'react-native-code-push';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo';
import { Provider } from 'mobx-react/native';
import Store from '../store';

const store = new Store();

const networkInterface = createNetworkInterface({
  uri: 'https://ueno-graphql-dev.herokuapp.com/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const { idToken } = store.user.user;
    req.options.headers.authorization = idToken ? `Bearer ${idToken}` : null;
    next();
  },
}]);

const client = new ApolloClient({ networkInterface });

const wrapScreenGetter = (route, getScreen) => {
  class ConnectedScreen extends Component {

    static displayName = `ConnectedScreen(${route})`;

    render() {
      const Screen = getScreen().default;
      return (
        <Provider user={store.user} ui={store.ui}>
          <ApolloProvider client={client}>
            <Screen {...this.props} />
          </ApolloProvider>
        </Provider>
      );
    }
  }

  return () => {
    // invoking this here ensures that our original `getScreen` function gets called, which we want
    // to happen to make sure that `Navigator.preload` still does meaningful work.
    getScreen();
    return codePush(ConnectedScreen);
  };
};

const registerConnectedScreen = (route, getScreen) =>
  Navigator.registerScreen(route, wrapScreenGetter(route, getScreen));

export default registerConnectedScreen;
