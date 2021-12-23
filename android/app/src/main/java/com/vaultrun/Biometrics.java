package com.vaultrun;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricManager.Authenticators;
import androidx.biometric.BiometricPrompt;
import com.facebook.react.bridge.Promise;
import java.util.concurrent.Executor;
import androidx.annotation.NonNull;
import android.os.Build;
import androidx.biometric.BiometricPrompt.PromptInfo;
import androidx.fragment.app.FragmentActivity;
import java.util.concurrent.Executors;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.UiThreadUtil;




public class Biometrics extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String TYPE_BIOMETRICS = "Biometrics";

    private final ReactApplicationContext mReactContext;
    private BiometricPrompt biometricPrompt;

    public Biometrics(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Biometrics";
    }

    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        this.release();
    }

    private int currentAndroidVersion() {
        return Build.VERSION.SDK_INT;
    }

    public class AuthCallback extends BiometricPrompt.AuthenticationCallback {
        private Promise promise;

        public AuthCallback(final Promise promise) {
            super();
            this.promise = promise;
        }

        @Override
        public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
            super.onAuthenticationError(errorCode, errString);
            this.promise.reject("error", biometricPromptErrName(errorCode));
        }

        @Override
        public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
            super.onAuthenticationSucceeded(result);
            this.promise.resolve(true);
        }
    }

    public BiometricPrompt getBiometricPrompt(final FragmentActivity fragmentActivity, final Promise promise) {
        // memoize so can be accessed to cancel
        if (biometricPrompt != null) {
            return biometricPrompt;
        }

        // listen for onHost* methods
        mReactContext.addLifecycleEventListener(this);

        AuthCallback authCallback = new AuthCallback(promise);
        Executor executor = Executors.newSingleThreadExecutor();
        biometricPrompt = new BiometricPrompt(
                fragmentActivity,
                executor,
                authCallback
        );

        return biometricPrompt;
    }

    private void biometricAuthenticate(final String title, final String subtitle, final String description, final String cancelButton, final Promise promise) {
        UiThreadUtil.runOnUiThread(
                new Runnable() {
                    @Override
                    public void run() {

                        FragmentActivity fragmentActivity = (FragmentActivity) mReactContext.getCurrentActivity();

                        if(fragmentActivity == null) return;


                        BiometricPrompt bioPrompt = getBiometricPrompt(fragmentActivity, promise);

                        PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                                .setDeviceCredentialAllowed(true)
                                .setConfirmationRequired(false)
                                //.setNegativeButtonText(cancelButton)
                                .setDescription(description)
                                .setSubtitle(subtitle)
                                .setTitle(title)
                                .build();

                        bioPrompt.authenticate(promptInfo);

                    }
                });

    }
    // the below constants are consistent across BiometricPrompt and BiometricManager
    private String biometricPromptErrName(int errCode) {
        switch (errCode) {
            case BiometricPrompt.ERROR_CANCELED:
                return "SystemCancel";
            case BiometricPrompt.ERROR_HW_NOT_PRESENT:
                return "FingerprintScannerNotSupported";
            case BiometricPrompt.ERROR_HW_UNAVAILABLE:
                return "FingerprintScannerNotAvailable";
            case BiometricPrompt.ERROR_LOCKOUT:
                return "DeviceLocked";
            case BiometricPrompt.ERROR_LOCKOUT_PERMANENT:
                return "DeviceLockedPermanent";
            case BiometricPrompt.ERROR_NEGATIVE_BUTTON:
                return "UserCancel";
            case BiometricPrompt.ERROR_NO_BIOMETRICS:
                return "FingerprintScannerNotEnrolled";
            case BiometricPrompt.ERROR_NO_DEVICE_CREDENTIAL:
                return "PasscodeNotSet";
            case BiometricPrompt.ERROR_NO_SPACE:
                return "DeviceOutOfMemory";
            case BiometricPrompt.ERROR_TIMEOUT:
                return "AuthenticationTimeout";
            case BiometricPrompt.ERROR_UNABLE_TO_PROCESS:
                return "AuthenticationProcessFailed";
            case BiometricPrompt.ERROR_USER_CANCELED:  // actually 'user elected another auth method'
                return "UserFallback";
            case BiometricPrompt.ERROR_VENDOR:
                // hardware-specific error codes
                return "HardwareError";
            default:
                return "FingerprintScannerUnknownError";
        }
    }

    private String getSensorError() {
        BiometricManager biometricManager = BiometricManager.from(mReactContext);
        int authResult = biometricManager.canAuthenticate(Authenticators.DEVICE_CREDENTIAL | Authenticators.BIOMETRIC_STRONG);

        if (authResult == BiometricManager.BIOMETRIC_SUCCESS) {
            return null;
        }
        if (authResult == BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE) {
            return "BiometricScannerNotSupported";
        } else if (authResult == BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED) {
            return "BiometricScannerNotEnrolled";
        } else if (authResult == BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE) {
            return "BiometricScannerNotAvailable";
        }

        return null;
    }

    @ReactMethod
    public void authenticate(String title, String subtitle, String description, String cancelButton, final Promise promise) {
            final String errorName = getSensorError();
            if (errorName != null) {
                promise.reject("error", errorName);
                Biometrics.this.release();
                return;
            }

            biometricAuthenticate(title, subtitle, description, cancelButton, promise);
    }

    @ReactMethod
    public void release() {
        if (biometricPrompt != null) {
            biometricPrompt.cancelAuthentication();  // if release called from eg React
        }
        biometricPrompt = null;
        mReactContext.removeLifecycleEventListener(this);
    }

    @ReactMethod
    public void isSensorAvailable(final Promise promise) {
        String errorName = getSensorError();

        if (errorName != null) {
            promise.reject("errorName", errorName);
        } else {
            promise.resolve(TYPE_BIOMETRICS);
        }
    }

}