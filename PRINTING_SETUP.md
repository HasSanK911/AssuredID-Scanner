# Receipt Printing Setup Guide

## Overview
The AssuredID Scanner app now supports both thermal printing using Sunmi printers and receipt sharing through the device's native share functionality. The app automatically attempts to print using the connected Sunmi thermal printer first, and falls back to sharing if the printer is not available.

## Features
- **Thermal Printing**: Direct printing to Sunmi thermal printers with professional formatting
- **Barcode Support**: QR codes and Code128 barcodes for easy scanning
- **Automatic Fallback**: Falls back to share functionality if printer is unavailable
- **Professional Receipts**: Centered headers, aligned text, and proper spacing
- **Real-time Status**: Shows printing progress and status messages
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Cross-Platform**: Works on all Android devices with Sunmi printer support

## Setup Instructions

### 1. Requirements
- Android device with Sunmi thermal printer support
- Sunmi thermal printer (P1, P2, or compatible models)
- Thermal paper (58mm or 80mm width)
- USB or Bluetooth connection to printer

### 2. Setup
1. Install the Sunmi printer library: `npm install @mitsuharu/react-native-sunmi-printer-library`
2. Connect your Sunmi thermal printer to the Android device
3. Load thermal paper into the printer
4. Ensure proper USB/Bluetooth drivers are installed
5. The app will automatically detect and use the printer when available

### 4. Using the Printing Feature

#### Thermal Printing (Primary)
- When you complete a transaction and reach the ReceiptScreen, tap the "Print Receipt" button
- The app will automatically attempt to print using the connected Sunmi thermal printer
- A professional receipt with barcodes and QR codes will be printed
- The paper will be automatically cut after printing (if supported)
- A success message will confirm the printing

#### Fallback Sharing (Secondary)
- If the Sunmi printer is not available, the app will fall back to sharing
- The receipt will be shared via the device's native share menu
- Choose your preferred printing method from the share options
- A status message will show the sharing progress

## Troubleshooting

### Printer Not Found
- Check USB/Bluetooth connection to the Sunmi printer
- Ensure the printer is powered on and properly connected
- Verify printer drivers are installed on the Android device
- Try reconnecting the printer and restarting the app

### Print Quality Issues
- Clean the printer head regularly
- Check thermal paper quality and replace if needed
- Adjust print density in printer settings
- Ensure proper paper alignment

### Paper Jams
- Remove jammed paper carefully
- Check paper alignment and loading
- Restart the printer if necessary
- Ensure thermal paper is properly loaded

### Fallback to Sharing
- If thermal printing fails, the app automatically falls back to sharing
- Check the share menu for available printing options
- Install printing apps from Google Play Store if needed
- Use cloud storage or email for remote printing

## Technical Details

### Libraries Used
- `@mitsuharu/react-native-sunmi-printer-library`: For Sunmi thermal printer support
- `react-native` Share API: For fallback sharing functionality

### Compatibility
The app is compatible with Android devices that support:
- Sunmi thermal printers (P1, P2, or compatible models)
- USB or Bluetooth connectivity
- Android 5.0 or higher
- Native share functionality (for fallback)

## Development Notes

### File Structure
- `src/screens/ReceiptScreen.tsx`: Main receipt screen with printing logic
- `src/utils/simplePrintUtils.ts`: Utility functions for thermal printing and fallback sharing
- `src/components/PrinterTest.tsx`: Testing component for printer functionality
- Android permissions required for Bluetooth/USB connectivity

### Key Functions
- `handlePrint()`: Main printing function with fallback
- `printReceiptSimple()`: Utility function for thermal printing with fallback
- `printReceiptWithSunmi()`: Direct Sunmi printer function
- `printReceiptText()`: Fallback sharing function

### Error Handling
- Comprehensive error handling for thermal printer issues
- Automatic fallback to sharing when printer is unavailable
- User-friendly error messages and status updates
- Graceful degradation for different scenarios

## Testing Receipt Printing

### Using the Printer Test Component
We've included a `PrinterTest` component that you can use to test thermal printing:

1. Import and use the `PrinterTest` component in your app
2. Tap "Test Sunmi Printer" to test basic printer connectivity
3. Tap "Test Receipt Printing" to test full receipt functionality
4. The tests will:
   - Check printer connectivity and initialization
   - Print test receipts with barcodes and QR codes
   - Show detailed results of each step
   - Fall back to sharing if printer is unavailable

### Manual Testing Steps
1. Connect your Sunmi thermal printer to the Android device
2. Load thermal paper into the printer
3. Complete a transaction to reach the ReceiptScreen
4. Tap the "Print Receipt" button
5. Check the printed receipt for quality and formatting
6. If printer is unavailable, test the fallback sharing functionality

## Future Enhancements
- Support for multiple printer selection and management
- Advanced printer settings configuration
- Print preview functionality before printing
- Custom receipt templates and branding
- Offline printing queue for network issues
- Support for additional barcode types
- Image and logo printing capabilities
