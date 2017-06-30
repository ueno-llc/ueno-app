Mac OS X Sierra 10.12.5
=======================

## React Native Packager

```bash
brew install git yarn cocoapods watchman
brew cask install android-platform-tools
npm install -g react-native-cli
```

I ran into this problem https://github.com/facebook/react-native/issues/910
Fixed with comment #2 or #3

```bash
yarn install
yarn start
# Let this run in a separate window
```

Now react native bundler is running successfully.
Next up is Android and iOS tools.

## iOS

Install xcode and this should work out of the box

```bash
react-native run-ios
```


## Android (sigh)

```bash
brew cask install java
brew cask install android-sdk
echo "export ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
source ~/.bash_profile
```

Install android studio https://developer.android.com/studio/index.html

```bash
# Shortcut
curl https://dl.google.com/dl/android/studio/install/2.3.3.0/android-studio-ide-162.4069837-mac.dmg > ~/Downloads/android-studio.dmg
open ~/Downloads/android-studio.dmg
```

Drag to Applications, open Android Studio there, hit next next next finish etc.
Take a coffee break, installing the dependencies takes a bit time.

1. Click "Open an existing android studio project"
2. Select the folder ~/Projects/ueno-app/android
3. Wait for everything to finish initializing, takes some time.
4. In "Messages Gradle Sync" you should see error "Failed to find target etc..", click "Install missing platform(s) and sync project".
5. Accept licenses and download stuff.
6. Repeat number 3.
7. Don't update gradle to 3.3

I personally needed to install additionally
 - Android SDK Platform 25 (revision: 3)
 - Android SDK Build-Tools 25.0.2
 - Android SDK Platform 23 (revision: 3)
 - Android SDK Build-Tools 23.0.1
 - Android SDK Build-Tools 23.0.3

Close Android Studio

### Running on Android device

Plug your phone in to USB port.

```bash
adb devices
```

Go to phone and check "Always allow ..." and hit Allow.

```bash
react-native run-android --appIdSuffix=debug
```

App now opens on device, but you will be prompted that the app want's to  draw overlay over other apps. Scroll down to our app and tick YES.
Go back to app, shake device and hit Reload.

### Running on Android Emulator

Create a emulator device with Google APIs (Needed for signin)

https://developer.android.com/studio/run/managing-avds.html

```bash
react-native run-android --appIdSuffix=debug
```

App now opens on device, but you will be prompted that the app want's to  draw overlay over other apps. Scroll down to our app and tick YES.
Go back to app, Command+M and hit Reload.
