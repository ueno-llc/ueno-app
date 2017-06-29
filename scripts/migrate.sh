DIR=${PWD##*/}
if [ $DIR == "scripts" ]; then
  echo "Must be run from parent directory"
  exit 1
fi

NODE_MODULES="${PWD}/node_modules"
NATIVE_NAVIGATION="$NODE_MODULES/native-navigation/lib/android"

# ANDROID
FILE1="$NATIVE_NAVIGATION/src/main/res/layout/fragment_react_native.xml"
FILE2="$NATIVE_NAVIGATION/src/main/java/com/airbnb/android/react/navigation/ReactNativeFragment.java"
patch -sN $FILE1 < ./scripts/fragment_react_native.xml.patch
patch -sN $FILE2 < ./scripts/ReactNativeFragment.java.patch
sed -i'.bak' -e 's/0.11.0/1.0.1/' "$NODE_MODULES/native-navigation/lib/android/build.gradle"
rm -rf "$FILE1.rej"
rm -rf "$FILE2.rej"

# IOS
FILE3="$NODE_MODULES/react-native/Libraries/NativeAnimation/RCTNativeAnimatedNodesManager.h"
patch -sN $FILE3 < ./scripts/RCTNativeAnimatedNodesManager.h.patch
rm -rf "$FILE3.rej"

# Copy libraries from node_modules
# Because we have the flag "use_frameworks" which doesn't allow exernal libs from node_modules
# Until better solution, lets move them.
cp -r ./node_modules/mobile-center-analytics/ios/RNAnalytics ios/UenoInternalApp/.
cp -r ./node_modules/mobile-center-analytics/ios/RNAnalytics ios/UenoInternalApp/.
cp -r ./node_modules/react-native-google-signin/ios/RNGoogleSignin ios/UenoInternalApp/.

# DONE
echo "===> Done patching files in $NODE_MODULES"
