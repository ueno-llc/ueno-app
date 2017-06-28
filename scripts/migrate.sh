DIR=${PWD##*/}
if [ $DIR == "scripts" ]; then
  echo "Must be run from parent directory"
  exit 1
fi

# ANDROID
FILE1=$(realpath ./node_modules/native-navigation/lib/android/src/main/res/layout/fragment_react_native.xml)
FILE2=$(realpath ./node_modules/native-navigation/lib/android/src/main/java/com/airbnb/android/react/navigation/ReactNativeFragment.java)
patch -sN $FILE1 < ./scripts/fragment_react_native.xml.patch
patch -sN $FILE2 < ./scripts/ReactNativeFragment.java.patch
sed -i'.bak' -e 's/0.11.0/1.0.1/' ./node_modules/native-navigation/lib/android/build.gradle
rm -rf ./node_modules/native-navigation/lib/android/src/main/res/layout/fragment_react_native.xml.rej
rm -rf ./node_modules/native-navigation/lib/android/src/main/java/com/airbnb/android/react/navigation/ReactNativeFragment.java.rej

# IOS
sed -i'.bak' -e 's/#import <RCTAnimation\\/RCTValueAnimatedNode.h>/#import "RCTValueAnimatedNode.h"/' ./node_modules/react-native/Libraries/NativeAnimation/RCTNativeAnimatedNodesManager.h

# DONE
echo "===> Done patching files in node_modules"
