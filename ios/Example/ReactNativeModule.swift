@objc(ReactNativeModule)
class ReactNativeModule: RCTEventEmitter {
  @objc override func supportedEvents() -> [String]! {
    return [
      
    ]
  }
  
  @objc static override func requiresMainQueueSetup() -> Bool {
    return false
  }
}
