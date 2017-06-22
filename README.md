Ueno Internal App
=================

Internal app for Ueno

Libraries
  - **native-navigation** for awesome navigating library
  - **mobx** and **mobx-react** for easy state management
  - **graphql** for data fetching layer
  - **codepush** for over-the-air updates of non-native code and resources.
  - **firebase-oauth** for social authentication

Pipeline
========

## Fastlane (for iOS)
  - Manage Provisioning profiles with **sigh**
  - Run tests with **scan**
  - Build and package the app with **gym**
  - Deploy and manage beta releases to TestFlight with **pilot**
  - Maybe use **boarding** for easy installs without publishing.
  - App screenshots with **snapshot** ?

## Fastlane (for Android)
  - Publish to Play Store with **supply**
  - App screenshots with **screengrab** ?

## Bitrise for continuous integration.
Bitrise runs on every pull-request and merge to master.
Runs unit tests, builds the app, releases to beta testers, sends slack message with link to app build.
Install cocoapods, does codepush releases etc.
