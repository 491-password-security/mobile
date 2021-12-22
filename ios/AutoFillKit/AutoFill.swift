//
//  AutoFill.swift
//  PasswordSecurity
//
//  Created by Altay Atalay on 22.12.2021.
//

import Foundation

//import class AuthenticationServices.ASCredentialProviderViewController
//import class AuthenticationServices.ASCredentialServiceIdentifier

import AuthenticationServices

@objc(RootViewController)
internal class RootViewController: ASCredentialProviderViewController {
  
}

@objc(AutoFill)
class AutoFill: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["initialCount": 0]
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true//launch on main thread
  }

  private var count = 0

  @objc
  func increment() {
    count += 1
    print("count is \(count)")
  }

  
}
