package com.whereismycar;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by dekeeu on 09/11/2017.
 */

public class MyUtilsModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;

    public MyUtilsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyUtils";
    }

    @ReactMethod
    public void sendEmail(String recipientString, String subject, String body){
        String uriText = "mailto:" + Uri.encode(recipientString)
                + "?body=" + Uri.encode(body)
                + "&subject=" + Uri.encode(subject);

        Intent sendIntent = new Intent(Intent.ACTION_SENDTO, Uri.parse(uriText));
        sendIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if(sendIntent.resolveActivity(this.reactContext.getPackageManager()) != null){
            this.reactContext.startActivity(sendIntent);
        }


    }
}
