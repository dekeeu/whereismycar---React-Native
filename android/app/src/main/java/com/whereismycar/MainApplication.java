package com.whereismycar;

import android.app.Application;

//import com.facebook.CallbackManager;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.fnp.reactnativesyncadapter.SyncAdapterPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  /*
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();


  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  */


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            //new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage(),
            new RNFetchBlobPackage(),
            new SyncAdapterPackage(),
              new MyUtilsPackage(),
              new MPAndroidChartPackage()
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
  }
}
