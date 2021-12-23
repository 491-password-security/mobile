//
//  Biometrics.swift
//  VaultRun
//
//  Created by Umur Demircioğlu on 23.12.2021.
//

import Foundation
import LocalAuthentication

@objc(Biometrics)
class Biometrics: NSObject {
  private var context = LAContext()
  private var authenticated = false
  private let group = DispatchGroup()
  
  @objc
  func authenticate(_ promise: RCTPromiseResolveBlock, rejector reject: RCTPromiseRejectBlock){
    self.group.enter()
    _authenticate()
    self.group.wait()
    if(self.authenticated){
      self.authenticated = false
      return promise(true)
    }
    return promise(false)
  }
    
  func _authenticate(){
    let reason = "Log in to your account"
    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason ) {
      success, error in
        if success {
          self.authenticated = true
        } else {
          self.authenticated = false
        }
        self.group.leave()
    }
    
  }
  
  @objc
  func checkPermissions(_ promise: RCTPromiseResolveBlock, rejector reject: RCTPromiseRejectBlock){
    var error: NSError?

    // Check for biometric authentication
    // permissions
    let permissions = context.canEvaluatePolicy(
        .deviceOwnerAuthenticationWithBiometrics,
        error: &error
    )

    if permissions {
      return promise(true)
    }else {
      return promise(false)
    }
  }
  
  @objc
  func checkAvailability(_ promise: RCTPromiseResolveBlock, rejector reject: RCTPromiseRejectBlock) {
    let biometry = context.biometryType
    if(biometry == LABiometryType.none){
      return promise(false)
    }
    return promise(true)
  }
  
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true//launch on main thread
  }



  
}
