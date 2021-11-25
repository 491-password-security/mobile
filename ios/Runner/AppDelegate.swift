import UIKit
import Flutter

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  let TAG_BLUR_VIEW = 12345
var blurView:UIVisualEffectView?
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
  override func applicationWillResignActive(
    _ application: UIApplication
  ) {
    if let view = self.window.rootViewController?.view.subviews.first(where: {$0.tag == TAG_BLUR_VIEW}){
        view.removeFromSuperview()
        blurView = nil
    }
    if blurView == nil{
        blurView = UIVisualEffectView(frame: UIScreen.main.bounds)
        blurView?.effect = UIBlurEffect(style: .light)
        blurView?.tag = TAG_BLUR_VIEW
    }
    self.window.rootViewController?.view.insertSubview(blurView!, at: 0)
  }
  override func applicationDidBecomeActive(
    _ application: UIApplication
  ) {
    if let view = self.window.rootViewController?.view.subviews.first(where: {$0.tag == TAG_BLUR_VIEW}){
        view.removeFromSuperview()
        blurView = nil
    }
  }
}
