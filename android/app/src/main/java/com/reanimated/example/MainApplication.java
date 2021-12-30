package com.reanimatederror.example;

import android.app.Application;
import android.app.Activity;
import java.util.List;

import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.facebook.react.PackageList;
import com.facebook.react.bridge.JSIModulePackage;

import com.swmansion.reanimated.ReanimatedJSIModulePackage;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost reactNativeHost = new ReactNativeHost(this) {
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new ReanimatedJSIModulePackage();
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ReactNativePackage());
      return packages;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Activity mainActivity;

  public void setMainActivity(Activity mainActivity) {
    this.mainActivity = mainActivity;
  }

  public Activity getMainActivity() {
    return this.mainActivity;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SoLoader.init(this, /* native exopackage */ false);
  }
}
