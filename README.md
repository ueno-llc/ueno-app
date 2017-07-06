Ueno Internal App
=================

Internal app for Ueno

Libraries
  - **native-navigation** for awesome native navigating library
  - **mobx** and **mobx-react** for easy state management
  - **apollo** for graphql data fetching layer
  - **code-push** for over-the-air updates of non-native code and resources.
  - **react-native-google-signin** for google authentication

Getting started
===============

Read the [Getting started guide](./GETTING_STARTED.md) for complete tutorial on a fresh Mac OS X.

If you already have all necessery tools for react-native development:

```bash
# Terminal 1
yarn start

# Terminal 2
react-native run-ios
react-native run-android --appIdSuffix=debug
```

Use [fastlane](./fastlane/README.md) if you are going to be publishing, deploying or testing releases.


### Debugging

[Reactotron](https://github.com/infinitered/reactotron) is enabled in development mode, they have both GUI and CLI to view mobx actions and network requests.

Pipeline
========

## Fastlane (for iOS)
  - Manage Provisioning profiles with **sigh**
  - Build and package the app with **gym**
  - Deploy and manage beta releases to TestFlight with **pilot**
  - Maybe use **boarding** for easy installs without publishing.
  - App screenshots with **snapshot** ?
  - Deploy and promote JS only changes with **code-push**

## Fastlane (for Android)
  - Publish to Play Store with **supply**
  - App screenshots with **screengrab** ?
  - Deploy and promote JS only changes with **code-push**

## Azure Mobile Center
 - Runs on every commit pushed to GitHub
 - Analytics
 - Crash reports
 - Code Push management
