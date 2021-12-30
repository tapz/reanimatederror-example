import UIKit

class AppDelegate: 
  UIResponder, 
  UIApplicationDelegate, 
  RCTBridgeDelegate
{
  var window: UIWindow?
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    let rootView = RCTRootView(bundleURL: self.bundleUrl, moduleName: "Example", initialProperties: [:], launchOptions: launchOptions)
    
    let window = UIWindow(frame: UIScreen.main.bounds)
    self.window = window
    
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    window.rootViewController = rootViewController
    window.makeKeyAndVisible()
    return true
  }
  
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    return self.bundleUrl
  }
  
  var bundleUrl: URL {
    #if DEBUG
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    #else
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
    #endif
  }
}
