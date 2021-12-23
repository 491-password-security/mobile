package com.vaultrun;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricManager.Authenticators;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.Promise;
import androidx.biometric.BiometricPrompt;
import java.util.concurrent.Executor;
import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Toast;




public class Biometrics extends ReactContextBaseJavaModule {
    BiometricManager biometricManager;
    Executor executor;
    Biometrics(ReactApplicationContext context) {
        super(context);
        biometricManager = androidx.biometric.BiometricManager.from(context);
        executor = ContextCompat.getMainExecutor(context);
    }



    @Override
    public String getName() {
        return "Biometrics";
    }

    boolean isPermissionAvailable = false;

    @ReactMethod
    public void hasPermission(final Promise promise) {
        switch (biometricManager.canAuthenticate(Authenticators.BIOMETRIC_STRONG | Authenticators.DEVICE_CREDENTIAL)) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                isPermissionAvailable = true;
                Log.d("MY_APP_TAG", "App can authenticate using biometrics.");
                System.out.print("kkmm" + isPermissionAvailable);
                break;
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                //promise.resolve(false);
                Log.e("MY_APP_TAG", "No biometric features available on this device.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                //promise.resolve(false);
                Log.e("MY_APP_TAG", "Biometric features are currently unavailable.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                //promise.resolve(false);
                // Prompts the user to create credentials that your app accepts.
                Log.e("MY_APP_TAG", "Biometric is not saved.");
                break;
        }

        promise.resolve(isPermissionAvailable);
    }

    // creating a variable for our Executor

    // this will give us result of AUTHENTICATION
    final BiometricPrompt biometricPrompt = new BiometricPrompt(executor, new BiometricPrompt.AuthenticationCallback() {
        @Override
        public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
            super.onAuthenticationError(errorCode, errString);
        }

        // THIS METHOD IS CALLED WHEN AUTHENTICATION IS SUCCESS
        @Override
        public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
            super.onAuthenticationSucceeded(result);
            Toast.makeText(getApplicationContext(), "Login Success", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onAuthenticationFailed() {
            super.onAuthenticationFailed();
        }
    });
    // creating a variable for our promptInfo
    // BIOMETRIC DIALOG
    public void authenticateUser() {
        final BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder().setTitle("GFG")
                .setDescription("Use your fingerprint to login ").setNegativeButtonText("Cancel").build();
        biometricPrompt.authenticate(promptInfo);
    }


}
