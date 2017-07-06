/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, WebView } from 'react-native';

export default class ArticlesDetail extends Component {

  static propTypes = {
    navigator: PropTypes.shape({
      setTitle: PropTypes.func,
    }).isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    url: '',
  };

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
  };

  componentWillMount() {
    const { navigator, title } = this.props;
    navigator.setTitle({ title });
  }

  render() {
    const { url } = this.props;
    const navbarHeight = Platform.select({ android: 54, ios: 64 });
    const injectedJavaScript = `
      const style = document.createElement('style');
      style.innerText = \`
        .overview__side,
        .overview-sidebar__header,
        .page-wrap { padding-top: ${navbarHeight}px !important; }
        .lesson__header { top: ${navbarHeight}px !important; }
      \`;
      document.body.appendChild(style);
    `;
    return (
      <WebView
        source={{ uri: url.trim() }}
        style={{ flex: 1 }}
        onNavigationStateChange={this.onNavigationStateChange}
        injectedJavaScript={injectedJavaScript}
      />
    );
  }
}
