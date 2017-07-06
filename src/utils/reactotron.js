import { spy } from 'mobx';

const getNameForThis = (who) => {
  if (who === null || who === undefined) {
    return '';
  } else if (who && typeof who === 'object') {
    if (who && who.$mobx) {
      return who.$mobx.name;
    } else if (who.constructor) {
      return who.constructor.name || 'object';
    }
  }
  return `${typeof who}`;
};

/* global __DEV__ */
if (__DEV__) {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const Reactotron = require('reactotron-react-native').default;

  Reactotron
    .configure()
    .useReactNative()
    .connect();

  Reactotron.clear();

  spy((event) => {
    const { type, ...rest } = event;
    switch (type) {

      case 'action': {
        const { name, object } = rest;
        const action = object || rest.arguments[0];
        Reactotron.send('state.action.complete', { name, action }, false);
      } break;

      case 'update': {
        const path = [getNameForThis(rest.object).replace(/@\d+$/, ''), rest.name].filter(n => String(n).trim() !== '').join('.');
        const value = rest.newValue;
        Reactotron.send('state.values.response', { path, value, valid: true }, false);
      } break;

      // TODO: Add reactions, transactions, computed, add, splice, delete etc.

      default:
    }
  });
}
