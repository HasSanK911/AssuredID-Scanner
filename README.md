# AssuredID Scanner

A React Native mobile application for scanning Assured IDs and managing patient drug prescriptions.

## Features

- **Login System**: Secure authentication with username and password
- **ID Scanner**: Manual input or QR code scanning for Assured IDs
- **Patient Details**: View patient information and claim status
- **Drug Selection**: Interactive drug selection with pricing
- **Receipt Generation**: Print receipts with detailed information
- **Professional UI**: Modern, clean interface with consistent branding
- **Splash Screen**: Logo display on app launch
- **Logout Functionality**: Logout button in header of all screens

## App Branding

- **App Name**: AssuredID Scanner
- **Logo**: Custom logo from assets folder
- **Primary Color**: #113493 (Professional Blue)
- **Splash Screen**: Logo display with branded background

## Screens

### 1. Splash Screen
- Displays the AssuredID Scanner logo
- 2-second duration with branded background (#113493)
- Smooth transition to login screen
- Logo properly sized and centered

### 2. Login Screen
- AssuredID Scanner logo at the top
- Username and password input fields
- Professional login button
- Form validation
- No logout button (as expected)

### 3. ID Scanner Screen
- Logo display
- Assured ID input field
- QR code scanner button (📷)
- Find button to search patient
- Logout button in header

### 4. QR Scanner Screen
- Simulated QR code scanning
- Manual input option
- Returns to ID Scanner with scanned data
- Logout button in header

### 5. Patient Details Screen
- Logo display
- Patient name (read-only input)
- Claim status display
- "Select Drugs" button
- Logout button in header

### 6. Drug Selection Screen
- Logo display
- Interactive drug selection buttons
- Each drug shows: name, price, size, currency
- Selected drugs change background color
- Total amount calculation
- Submit button
- Logout button in header

### 7. Receipt Screen
- Logo display
- Receipt with unique ID and timestamp
- Selected drugs and prices
- Total amount
- Print receipt (Share API)
- New order option
- Logout button in header

## Technical Details

### Navigation
- React Navigation Stack Navigator
- TypeScript for type safety
- Proper screen parameter passing
- Logout functionality with confirmation dialog

### Data
- Static/mock data for demonstration
- Patient information simulation
- Drug catalog with pricing
- Dynamic receipt generation

### UI/UX
- Consistent color scheme (#113493)
- Professional shadows and rounded corners
- Responsive design
- Loading states and error handling
- Logout button in header of all screens except login

### Android Integration
- Custom app icon using logo
- Splash screen with logo display
- App name: "AssuredID Scanner"
- Proper permissions for camera and storage
- Native splash screen implementation

## Demo Flow

1. **Launch App**: See splash screen with logo for 2 seconds
2. **Login**: Enter any username/password
3. **ID Scanner**: 
   - Enter Assured ID manually, OR
   - Click QR icon for simulated scanning
   - Use "Generate Test QR" for demo data
4. **Patient Details**: View patient information
5. **Drug Selection**: Select multiple drugs
6. **Receipt**: View and "print" receipt
7. **Logout**: Use logout button in header to return to login

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. For Android:
   ```bash
   npx react-native run-android
   ```

## Development

### Running the App
```bash
# Terminal 1: Start Metro bundler
npx react-native start

# Terminal 2: Run on Android
npx react-native run-android
```

### Project Structure
```
src/
├── assets/
│   └── logo.png          # App logo
├── components/
│   └── QRCodeGenerator.tsx
└── screens/
    ├── LoginScreen.tsx
    ├── IdScannerScreen.tsx
    ├── QRScannerScreen.tsx
    ├── PatientDetailsScreen.tsx
    ├── DrugSelectionScreen.tsx
    └── ReceiptScreen.tsx
```

## Dependencies

- React Navigation
- React Native Safe Area Context
- TypeScript
- React Native Gesture Handler

## Notes

- QR Scanner is simulated for demo purposes
- All data is static/mocked
- Receipt printing uses Share API
- App icon and splash screen use the logo from assets
- Professional branding throughout the application
- Logout button appears in header of all screens except login
- Splash screen shows logo for 2 seconds on app launch
