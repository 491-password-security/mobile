//
//  Biometrics.m
//  VaultRun
//
//  Created by Umur Demircioğlu on 23.12.2021.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(Biometrics, NSObject)
  RCT_EXTERN_METHOD(checkAvailability:(RCTPromiseResolveBlock)promise rejector: (RCTPromiseRejectBlock)reject)
  RCT_EXTERN_METHOD(checkPermissions:(RCTPromiseResolveBlock)promise rejector: (RCTPromiseRejectBlock)reject)
  RCT_EXTERN_METHOD(authenticate:(RCTPromiseResolveBlock)promise rejector: (RCTPromiseRejectBlock)reject)
@end
