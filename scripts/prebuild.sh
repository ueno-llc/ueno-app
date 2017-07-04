# Copy react-native-navigation podspec
cp -r ./scripts/react-native-navigation.podspec ./node_modules/react-native-navigation/.


# Copy libraries from node_modules
# Because we have the flag "use_frameworks" which doesn't allow exernal libs from node_modules
# Until better solution, lets move them.
cp -r ./node_modules/mobile-center-analytics/ios/RNAnalytics ios/UenoInternalApp/.
cp -r ./node_modules/mobile-center-analytics/ios/RNAnalytics ios/UenoInternalApp/.
cp -r ./node_modules/react-native-google-signin/ios/RNGoogleSignin ios/UenoInternalApp/.

# Fix this shit
perl -pi -w -e 's/appName = scheme/appName = \'ueno. (dev)\'/g;' ./node_modules/react-native/local-cli/runIOS/runIOS.js


# DONE
echo "===> prebuild done"
