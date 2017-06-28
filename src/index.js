/* eslint global-require: 0 */
import registerConnectedScreen from './utils/registerConnectedScreen';

registerConnectedScreen('Home', () => require('./screens/Home'));
registerConnectedScreen('Articles', () => require('./screens/Articles'));
registerConnectedScreen('Contacts', () => require('./screens/Contacts'));
