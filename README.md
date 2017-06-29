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

1. Install the react-native command line utility.

```bash
npm install -g react-native-cli
```

2. [Install xcode and fastlane](./fastlane/README.md)

3. Run yarn start in a separate terminal window from the react-native run.

```bash
yarn start # Terminal 1
react-native run-[ios|android] # Terminal 2
```

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
