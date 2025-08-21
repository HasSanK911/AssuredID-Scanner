# Receipt Printing Setup Guide

## Overview
The AssuredID Scanner app now supports receipt sharing and printing through the device's native share functionality. When you click the "Print Receipt" button, the receipt is shared and you can print it using any available printing options.

## Features
- **Manual Printing**: Receipts are shared only when you click the "Print Receipt" button
- **Native Share Integration**: Uses the device's built-in share functionality
- **Multiple Print Options**: Print via email, cloud storage, or any installed printing apps
- **Real-time Status**: Shows sharing progress and status messages
- **Reliable Operation**: No external dependencies or complex setup required
- **Cross-Platform**: Works on all Android devices without special permissions

## Setup Instructions

### 1. Requirements
- Android device with share functionality
- No special hardware or setup required

### 2. Setup
1. No setup required - the app works out of the box
2. The device's native share functionality handles all printing options
3. You can use any printing app or service available on your device

### 4. Using the Printing Feature

#### Manual Printing
- When you complete a transaction and reach the ReceiptScreen, tap the "Print Receipt" button
- The receipt will be shared via the device's native share menu
- Choose your preferred printing method from the share options
- A status message will show the sharing progress
- The button will be disabled while sharing is in progress

## Troubleshooting

### Share Menu Not Appearing
- Ensure your device supports the share functionality
- Try restarting the app
- Check if any share apps are installed on your device

### Printing Options Not Available
- Install a printing app from the Google Play Store
- Use cloud storage services (Google Drive, Dropbox) to save and print
- Use email to send the receipt to yourself for printing

### Receipt Not Sharing
- Check if the app has permission to share content
- Try restarting the app
- Ensure you have sufficient storage space

## Technical Details

### Libraries Used
- `react-native` Share API: For native sharing functionality

### Compatibility
The app is compatible with all Android devices that support:
- Native share functionality
- Text sharing
- Multiple share targets (email, cloud storage, printing apps)

## Development Notes

### File Structure
- `src/screens/ReceiptScreen.tsx`: Main receipt screen with sharing logic
- `src/utils/simplePrintUtils.ts`: Utility functions for receipt sharing
- No special Android permissions required

### Key Functions
- `handlePrint()`: Main sharing function
- `printReceiptSimple()`: Utility function for receipt sharing
- `printReceiptText()`: Alternative simple text format

### Error Handling
- Simple and reliable error handling
- User-friendly error messages
- Graceful fallback options

## Testing Receipt Sharing

### Using the Receipt Test Component
We've included a `PrinterTest` component that you can use to test receipt sharing:

1. Import and use the `PrinterTest` component in your app
2. Tap "Run Receipt Test" to start the testing process
3. The test will:
   - Create a sample receipt
   - Share it via the device's share menu
   - Show detailed results of each step

### Manual Testing Steps
1. Complete a transaction to reach the ReceiptScreen
2. Tap the "Print Receipt" button
3. Choose your preferred sharing method from the menu
4. Print the receipt using your chosen method

## Future Enhancements
- Support for multiple printer selection
- Printer settings configuration
- Print preview functionality
- Receipt template customization
- Offline printing queue
