# Sunmi Thermal Printer Setup Guide

## Overview
The AssuredID Scanner app now supports thermal printing using the Sunmi printer library. This integration provides professional receipt printing with barcodes, QR codes, and formatted text directly to thermal printers.

## Features
- **Thermal Receipt Printing**: Direct printing to Sunmi thermal printers
- **Barcode Support**: Both QR codes and Code128 barcodes
- **Professional Formatting**: Centered headers, aligned text, and proper spacing
- **Automatic Paper Cutting**: Cuts paper after printing (if supported by printer)
- **Fallback Support**: Falls back to share functionality if printer is unavailable
- **Error Handling**: Comprehensive error handling and user feedback

## Hardware Requirements
- Sunmi thermal printer (P1, P2, or compatible models)
- Android device with USB or Bluetooth connectivity to printer
- Thermal paper (58mm or 80mm width)

## Software Requirements
- React Native app with `@mitsuharu/react-native-sunmi-printer-library` package
- Android device running Android 5.0 or higher
- Proper USB/Bluetooth drivers for Sunmi printer

## Installation

### 1. Install the Sunmi Printer Library
```bash
npm install @mitsuharu/react-native-sunmi-printer-library
```

### 2. Link the Library (if using React Native < 0.60)
```bash
react-native link @mitsuharu/react-native-sunmi-printer-library
```

### 3. Android Permissions
Add the following permissions to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### 4. Build the App
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

## Usage

### Basic Printing
The app automatically attempts to print using the Sunmi printer when the "Print Receipt" button is pressed. If the printer is not available, it falls back to the share functionality.

### Testing the Printer
Use the `PrinterTest` component to test printer connectivity:

```typescript
import PrinterTest from './src/components/PrinterTest';

// Add to your navigation or screen
<PrinterTest />
```

### Manual Printing Function
```typescript
import { printReceiptSimple } from './src/utils/simplePrintUtils';

const receiptData = {
  receiptId: 'RCP-001',
  claimNumber: 'CLM-123456',
  currentDate: '2024-01-15',
  patientName: 'John Doe',
  selectedDrugs: [
    { name: 'Aspirin', size: '100mg', currency: 'USD', price: 5.99 }
  ],
  totalAmount: 5.99
};

const success = await printReceiptSimple(receiptData);
```

## Printer Configuration

### Supported Paper Sizes
- **58mm**: Maximum pixel width 384
- **80mm**: Maximum pixel width 576

### Font Sizes
- Default: 24
- Available range: 16-32 (depending on printer model)

### Alignment Options
- `'left'`: Left alignment
- `'center'`: Center alignment  
- `'right'`: Right alignment

### Barcode Types
- **QR Code**: Error levels: 'low', 'middle', 'quartile', 'high'
- **Code128**: Standard 1D barcode
- **Code39**: Alphanumeric barcode
- **EAN13**: 13-digit European Article Number

## Receipt Format

The printed receipt includes:
1. **Header**: "AssuredID Scanner - Receipt" (centered, large font)
2. **Claim Number**: Patient's unique claim identifier
3. **QR Code**: Scannable QR code containing claim number
4. **Barcode**: Code128 barcode for claim number
5. **Receipt Details**: ID, date, patient name
6. **Items List**: Drug name, size, and price (right-aligned)
7. **Total**: Total amount (right-aligned, large font)
8. **Footer**: Thank you message
9. **Paper Cut**: Automatic paper cutting

## Error Handling

### Common Issues and Solutions

#### Printer Not Found
- **Symptom**: "Printer not available" message
- **Solution**: 
  - Check USB/Bluetooth connection
  - Ensure printer is powered on
  - Verify printer drivers are installed
  - Try reconnecting the printer

#### Print Quality Issues
- **Symptom**: Faded or unclear text
- **Solution**:
  - Clean printer head
  - Check thermal paper quality
  - Adjust print density in printer settings
  - Replace thermal paper if needed

#### Paper Jams
- **Symptom**: Printer stops or error messages
- **Solution**:
  - Remove jammed paper carefully
  - Check paper alignment
  - Ensure paper is properly loaded
  - Restart printer if necessary

#### Connection Issues
- **Symptom**: "Failed to initialize printer" error
- **Solution**:
  - Check USB cable or Bluetooth pairing
  - Restart both device and printer
  - Verify printer is in the correct mode
  - Check Android device permissions

## API Reference

### Core Functions

#### `prepare()`
Initializes the printer connection.
```typescript
await SunmiPrinter.prepare();
```

#### `setAlignment(alignment: 'left' | 'center' | 'right')`
Sets text alignment.
```typescript
await SunmiPrinter.setAlignment('center');
```

#### `setFontSize(size: number)`
Sets font size (16-32).
```typescript
await SunmiPrinter.setFontSize(24);
```

#### `printText(text: string)`
Prints text to the printer.
```typescript
await SunmiPrinter.printText('Hello World\n');
```

#### `printQRCode(text: string, moduleSize: number, errorLevel: 'low' | 'middle' | 'quartile' | 'high')`
Prints a QR code.
```typescript
await SunmiPrinter.printQRCode('123456', 8, 'middle');
```

#### `printBarcode(text: string, symbology: string, height: number, width: number, textPosition: string)`
Prints a 1D barcode.
```typescript
await SunmiPrinter.printBarcode('123456', 'CODE128', 162, 2, 'textUnderBarcode');
```

#### `lineWrap(count: number)`
Feeds paper by specified number of lines.
```typescript
await SunmiPrinter.lineWrap(3);
```

#### `cutPaper()`
Cuts the paper (if supported).
```typescript
await SunmiPrinter.cutPaper();
```

### Utility Functions

#### `printReceiptSimple(receiptData)`
Main function for printing receipts with fallback support.
```typescript
const success = await printReceiptSimple({
  receiptId: 'RCP-001',
  claimNumber: 'CLM-123456',
  currentDate: '2024-01-15',
  patientName: 'John Doe',
  selectedDrugs: [...],
  totalAmount: 25.99
});
```

#### `printReceiptWithSunmi(receiptData)`
Direct Sunmi printer function (no fallback).
```typescript
const success = await printReceiptWithSunmi(receiptData);
```

## Testing

### Printer Test Component
The `PrinterTest` component provides comprehensive testing:

1. **Test Sunmi Printer**: Basic connectivity and simple receipt printing
2. **Test Receipt Printing**: Full receipt with barcodes and formatting
3. **Real-time Results**: Shows detailed test progress and results

### Manual Testing Steps
1. Connect Sunmi printer to Android device
2. Load thermal paper
3. Run the app and navigate to PrinterTest component
4. Tap "Test Sunmi Printer" to verify basic connectivity
5. Tap "Test Receipt Printing" to test full receipt functionality
6. Check printed output for quality and formatting

## Troubleshooting

### Debug Information
Enable debug logging by checking console output:
```typescript
console.log('Printer status:', await SunmiPrinter.getPrinterState());
console.log('Printer info:', await SunmiPrinter.getPrinterInfo());
```

### Common Error Messages
- **"Printer not available"**: Connection or initialization issue
- **"Failed to print"**: Paper jam, low paper, or hardware issue
- **"Invalid parameters"**: Check function parameters and types
- **"Permission denied"**: Check Android permissions

### Performance Optimization
- Use `prepare()` only once at app startup
- Batch print operations when possible
- Handle errors gracefully with fallback options
- Monitor printer status regularly

## Future Enhancements
- Support for multiple printer selection
- Custom receipt templates
- Print preview functionality
- Offline print queue
- Advanced formatting options
- Support for images and logos
- Multi-language support

## Support
For technical support with the Sunmi printer library:
- Check the [official documentation](https://github.com/mitsuharu/react-native-sunmi-printer-library)
- Review the [API reference](https://github.com/mitsuharu/react-native-sunmi-printer-library#api)
- Report issues on the [GitHub repository](https://github.com/mitsuharu/react-native-sunmi-printer-library/issues)

For AssuredID Scanner specific issues:
- Check the app logs for detailed error information
- Use the PrinterTest component for diagnostics
- Verify hardware connections and permissions
