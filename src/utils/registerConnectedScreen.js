import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
// import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'mobx-react/native';
import Store from '../store';

const store = new Store();

const wrapScreenGetter = (route, getScreen) => {
  class ConnectedScreen extends Component {

    static displayName = `ConnectedScreen(${route})`;

    render() {
      const Screen = getScreen();
      return (
        <Provider user={store.user} ui={store.ui}>
          <ApolloProvider client={store.apolloClient}>
            <Screen {...this.props} />
          </ApolloProvider>
        </Provider>
      );
    }
  }

  return () => ConnectedScreen;
};

const registerConnectedScreen = (route, getScreen) =>
  Navigation.registerComponent(route, wrapScreenGetter(route, getScreen));

export default registerConnectedScreen;
