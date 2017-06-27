package com.uenointernalapp;

import android.app.Application;
import android.view.Window;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.navigation.NativeNavigationPackage;
import com.airbnb.android.react.navigation.ReactNavigationCoordinator;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.microsoft.codepush.react.CodePush;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new NativeNavigationPackage(),
          new RNGoogleSigninPackage(),
          new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    ReactNavigationCoordinator coordinator = ReactNavigationCoordinator.sharedInstance;
    coordinator.injectReactInstanceManager(mReactNativeHost.getReactInstanceManager());
    coordinator.start(this);
  }
}
