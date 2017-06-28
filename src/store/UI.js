import codePush from 'react-native-code-push';
import { observable, computed } from 'mobx';

export default class UI {
  constructor() {
    this.getUpdateMetadata();
  }

  @observable
  appMetaData = null;

  async getUpdateMetadata() {
    const update = await codePush.getUpdateMetadata();
    if (!update) return;
    this.appMetaData = update;
  }

  @computed
  get appVersionString() {
    const update = this.appMetaData;
    if (!update) return '~';
    return `${update.appVersion} (${update.label}-${update.packageHash.substr(0, 7)})`;
  }
}
