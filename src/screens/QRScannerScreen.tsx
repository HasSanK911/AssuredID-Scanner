import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Camera } from 'react-native-camera-kit';

type QRScannerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QRScanner'
>;

interface Props {
  navigation: QRScannerScreenNavigationProp;
}

const QRScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  console.log('QRScannerScreen rendered', isScanning);

  const handleScan = (event: any) => {
    setIsScanning(false); // close scanner after scan

    const scannedCode = event.nativeEvent.codeStringValue;
    console.log('Scanned code:', scannedCode);

    if (scannedCode) {
      navigation.navigate('PatientDetails', { assuredId: scannedCode });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QR Code Scanner</Text>
      </View>

      <View style={styles.scannerContainer}>
        {isScanning ? (
          <Camera
            style={{ flex: 1 }}
            scanBarcode={true}
            onReadCode={handleScan}
            showFrame={true}
            laserColor="red"
            frameColor="white"
          />
        ) : (
          <View style={styles.scannerContent}>
            <Text style={styles.scannerIcon}>📷</Text>
            <Text style={styles.scannerTitle}>QR Code Scanner</Text>
            <Text style={styles.scannerSubtitle}>
              Tap the button below to scan a QR code
            </Text>

            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => setIsScanning(true)}
            >
              <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!isScanning && (
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How to use:</Text>
          <Text style={styles.instructionText}>• Tap "Scan QR Code" to start scanning</Text>
          <Text style={styles.instructionText}>• It will navigate directly after scan</Text>
          <Text style={styles.instructionText}>• Example: PatientDetails screen</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  scannerContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scannerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerIcon: { fontSize: 80, marginBottom: 20 },
  scannerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  scannerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  scanButton: {
    backgroundColor: '#113493',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
  },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  instructions: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  instructionText: { fontSize: 14, color: '#666', marginBottom: 5 },
});

export default QRScannerScreen;
