# Camera Setup for AssuredIdScanner

## Overview
The app has been updated to use the real device camera instead of a simulated camera for QR code scanning.

## Changes Made

### 1. Dependencies Added
- `react-native-camera`: Provides access to the device camera
- `react-native-qrcode-scanner`: QR code scanning functionality
- `react-native-permissions`: Handles camera permissions

### 2. Files Modified
- `src/screens/QRScannerScreen.tsx`: Replaced simulated camera with real camera implementation
- `android/app/src/main/AndroidManifest.xml`: Camera permission already present
- `ios/AssuredIdScanner/Info.plist`: Added camera usage description
- `src/types/camera.d.ts`: Added TypeScript type declarations

### 3. Features
- Real-time QR code scanning using device camera
- Flash/torch toggle for better scanning in low light
- Camera permission handling for both Android and iOS
- Manual input fallback option
- Professional camera UI with scan markers

## How to Use

### For Users
1. Navigate to the QR Scanner screen
2. Tap "Start Camera Scanner" to open the real camera
3. Point the camera at a QR code
4. The app will automatically detect and scan the QR code
5. Use the flash button (🔦) to toggle the torch for better visibility
6. Use "Manual Input" as a fallback option

### For Developers
1. The camera permissions are automatically requested
2. The scanner uses `react-native-qrcode-scanner` for reliable QR detection
3. Flash mode can be toggled between 'off' and 'torch'
4. The scanner automatically reactivates after each scan

## Testing
- Test on a real device (camera won't work in simulator)
- Try scanning various QR codes
- Test flash functionality in low light conditions
- Verify permission handling on first use

## Troubleshooting
- If camera doesn't open, check device permissions
- Ensure you're testing on a physical device
- For iOS, make sure CocoaPods dependencies are installed
- For Android, ensure camera permission is granted

## Notes
- The app still shows dummy data (ASID123456789) regardless of scanned QR code for demo purposes
- Camera functionality requires a physical device for testing
- iOS requires CocoaPods setup for native dependencies
