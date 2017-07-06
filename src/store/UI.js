import codePush from 'react-native-code-push';
import { AsyncStorage } from 'react-native';
import { observable, computed, action, reaction } from 'mobx';
import { autobind } from 'core-decorators';

export default class UI {

  constructor() {
    this.getUpdateMetadata();
    // Attempt to restore screen when navigator is available
    reaction(() => this.navigator !== null, this.restoreScreen);
    // Attempt to persist screen when changed
    reaction(() => this.screen, this.persistScreen);
  }

  @observable
  navigator = null;

  @observable
  screen = {
    screen: 'Home',
    passProps: {},
  };

  @autobind
  @action
  async restoreScreen() {
    try {
      const screen = JSON.parse(await AsyncStorage.getItem('@UenoInternalApp:screen'));
      if (screen.screen !== 'Home') {
        // Don't animate screen
        screen.animated = false;
        this.push(screen);
      }
    } catch (err) {
      console.log('Failed restoring screen', err);
    }
  }

  @autobind
  @action
  async persistScreen(screen) {
    try {
      await AsyncStorage.setItem('@UenoInternalApp:screen', JSON.stringify(screen));
    } catch (err) {
      console.error('Error persisting screen', err);
    }
  }

  @autobind
  @action
  push(screen) {
    this.screen = screen;
    this.navigator.push({
      animationType: 'slide-horizontal',
      ...this.screen,
    });
  }

  @observable
  appMetaData = null;

  @observable
  codePushConfiguration = null;

  @action
  async getUpdateMetadata() {
    const update = await codePush.getUpdateMetadata();
    this.codePushConfiguration = await codePush.getConfiguration();
    if (!update) return;
    this.appMetaData = update;
  }

  @computed
  get appVersionString() {
    const update = this.appMetaData;
    const configuration = this.codePushConfiguration;
    if (!update) {
      if (!configuration) return '~';
      return `${configuration.appVersion} (Build ${configuration.buildVersion})`;
    }
    return `${update.appVersion} (${update.label}-${update.packageHash.substr(0, 7)})`;
  }
}
