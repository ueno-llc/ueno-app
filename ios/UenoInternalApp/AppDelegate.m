/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RNCrashes.h"
#import "RNAnalytics.h"
#import "RNGoogleSignIn.h"
#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>

@import NativeNavigation;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self
                                            launchOptions:launchOptions];
  ReactNavigationCoordinator *coordinator = [ReactNavigationCoordinator sharedInstance];

  [coordinator setBridge:bridge];
  [coordinator setDelegate:self];

  [RNCrashes registerWithCrashDelegate: [[RNCrashesDelegateAlwaysSend alloc] init]];  // Initialize Mobile Center crashes
  [RNAnalytics registerWithInitiallyEnabled:true];  // Initialize Mobile Center analytics

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  ReactViewController *mainViewController = [[ReactViewController alloc] initWithModuleName:@"Home"];
  self.window.rootViewController = [[coordinator navigation] makeNavigationControllerWithRootViewController:mainViewController];
  [self.window makeKeyAndVisible];
  return YES;
}

// code-push
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  NSURL *jsCodeLocation;
  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #else
    jsCodeLocation = [CodePush bundleURL];
  #endif
  return jsCodeLocation;
}

// native-navigation
- (UIViewController *)rootViewControllerForCoordinator: (ReactNavigationCoordinator *)coordinator {
  return self.window.rootViewController;
}

// for google authentication
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

@end
