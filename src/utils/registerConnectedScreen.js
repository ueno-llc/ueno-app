import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import codePush from 'react-native-code-push';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'mobx-react/native';
import hoistNonReactStatic from 'hoist-non-react-statics';

const wrapScreenGetter = (route, getScreen, store) => {

  const Screen = getScreen();

  class ConnectedScreen extends Component {

    static displayName = `ConnectedScreen(${route})`;

    render() {
      return (
        <Provider user={store.user} ui={store.ui}>
          <ApolloProvider client={store.apolloClient}>
            <Screen {...this.props} />
          </ApolloProvider>
        </Provider>
      );
    }
  }

  const ComposedComponent = codePush(ConnectedScreen);
  hoistNonReactStatic(ComposedComponent, Screen);

  return () => ComposedComponent;
};

const registerConnectedScreen = (route, getScreen, store) =>
  Navigation.registerComponent(route, wrapScreenGetter(route, getScreen, store));

export default registerConnectedScreen;
