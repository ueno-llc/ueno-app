import React, { Component } from 'react';
import Navigator from 'native-navigation';
import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'mobx-react/native';
import Store from '../store';

const store = new Store();

const wrapScreenGetter = (route, getScreen) => {
  class ConnectedScreen extends Component {

    static displayName = `ConnectedScreen(${route})`;

    render() {
      const Screen = getScreen().default;
      return (
        <Provider user={store.user} ui={store.ui}>
          <ApolloProvider client={store.apolloClient}>
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
