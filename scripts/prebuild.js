const fs = require('fs-extra');
const replace = require('replace-in-file');
const path = require('path');

[
  ['scripts/react-native-navigation.podspec', 'node_modules/react-native-navigation/react-native-navigation.podspec'],
  ['node_modules/mobile-center-analytics/ios/RNAnalytics', 'ios/UenoInternalApp/RNAnalytics'],
  ['node_modules/mobile-center-crashes/ios/RNCrashes', 'ios/UenoInternalApp/RNCrashes'],
  ['node_modules/react-native-google-signin/ios/RNGoogleSignin', 'ios/UenoInternalApp/RNGoogleSignin'],
]
.forEach(([from, to]) => {
  fs.copy(path.join(__dirname, '..', from), path.join(__dirname, '..', to))
  .then(() => console.log('Copied', from))
  .catch(err => console.error('Could not copy', from, err));
});

replace({
  files: path.join(__dirname, '../node_modules/react-native/local-cli/runIOS/runIOS.js'),
  from: /\/export FULL_PRODUCT_NAME="\?\(\.\+\).app"\?\$\//,
  to: '/export FULL_PRODUCT_NAME="?(.+).app"?/',
})
.then(files => console.log('Modified file', files.join(', ')))
.catch(err => console.error('Error modifying file', err));
