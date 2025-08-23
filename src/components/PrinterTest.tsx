import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { printReceiptSimple } from '../utils/simplePrintUtils';
import SunmiPrinter from '@mitsuharu/react-native-sunmi-printer-library';

const PrinterTest: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testSunmiPrinter = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      addResult('Testing Sunmi printer connection...');
      
      // Test 1: Initialize printer
      addResult('Initializing printer...');
      await SunmiPrinter.initPrinter();
      addResult('✅ Printer initialized successfully');
      
      // Test 2: Print a simple test receipt
      addResult('Printing test receipt...');
      await SunmiPrinter.setAlignment(1); // Center alignment
      await SunmiPrinter.setFontSize(24);
      await SunmiPrinter.printText('=== SUNMI PRINTER TEST ===\n');
      await SunmiPrinter.setFontSize(16);
      await SunmiPrinter.printText('Date: ' + new Date().toLocaleString() + '\n');
      await SunmiPrinter.printText('Status: Connected Successfully\n');
      await SunmiPrinter.printText('Printer: Sunmi Thermal Printer\n');
      await SunmiPrinter.printText('Barcode Test: QR + Code128\n');
      await SunmiPrinter.printText('=== END TEST ===\n');
      await SunmiPrinter.printText('\n\n\n'); // Feed paper
      await SunmiPrinter.paperCut(); // Cut paper
      
      addResult('✅ Test receipt printed successfully');
      
      Alert.alert(
        'Sunmi Printer Test Complete',
        'Sunmi printer test completed successfully! Check your printer for the test receipt.',
        [{ text: 'OK' }]
      );

    } catch (error) {
      addResult(`❌ Error: ${error}`);
      Alert.alert(
        'Sunmi Printer Test Error',
        `An error occurred during testing: ${error}`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsTesting(false);
    }
  };

  const testPrinterConnection = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      addResult('Starting receipt printing test...');
      
      // Test 1: Create test receipt data
      addResult('Creating test receipt...');
      const testReceiptData = {
        receiptId: 'TEST-' + Date.now(),
        claimNumber: 'CLM-TEST-' + Date.now(),
        currentDate: new Date().toLocaleString(),
        patientName: 'Test Patient',
        selectedDrugs: [
          { name: 'Test Drug 1', size: '100mg', currency: 'USD', price: 25.99 },
          { name: 'Test Drug 2', size: '50mg', currency: 'USD', price: 15.50 }
        ],
        totalAmount: 41.49
      };

      // Test 2: Try to print the receipt
      addResult('Testing receipt printing...');
      const printSuccess = await printReceiptSimple(testReceiptData);
      
      if (printSuccess) {
        addResult('✅ Receipt printed successfully!');
        addResult('Check your printer for the test receipt.');
        Alert.alert(
          'Test Complete',
          'Receipt printing test completed successfully! Check your printer for the test receipt.',
          [{ text: 'OK' }]
        );
      } else {
        addResult('❌ Failed to print receipt');
        Alert.alert(
          'Test Failed',
          'Receipt printing test failed. Check the results above for details.',
          [{ text: 'OK' }]
        );
      }

    } catch (error) {
      addResult(`❌ Error: ${error}`);
      Alert.alert(
        'Test Error',
        `An error occurred during testing: ${error}`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsTesting(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Printer Test</Text>
        <Text style={styles.subtitle}>Test Sunmi printer and receipt printing</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.testButton, isTesting && styles.disabledButton]}
          onPress={testSunmiPrinter}
          disabled={isTesting}
        >
          <Text style={styles.testButtonText}>
            {isTesting ? 'Testing...' : 'Test Sunmi Printer'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.testButton, isTesting && styles.disabledButton]}
          onPress={testPrinterConnection}
          disabled={isTesting}
        >
          <Text style={styles.testButtonText}>
            {isTesting ? 'Testing...' : 'Test Receipt Printing'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearResults}
        >
          <Text style={styles.clearButtonText}>Clear Results</Text>
        </TouchableOpacity>
      </View>

      {testResults.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Test Results:</Text>
          {testResults.map((result, index) => (
            <Text key={index} style={styles.resultText}>
              {result}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionText}>• "Test Sunmi Printer" - Tests basic Sunmi printer connectivity</Text>
        <Text style={styles.instructionText}>• "Test Receipt Printing" - Tests full receipt printing with claim number and barcodes</Text>
        <Text style={styles.instructionText}>• Receipts include both QR code and traditional barcode (Code128)</Text>
        <Text style={styles.instructionText}>• Ensure your Sunmi printer is connected and ready</Text>
        <Text style={styles.instructionText}>• If printer is not available, receipt will be shared via share menu</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 30,
  },
  testButton: {
    backgroundColor: '#113493',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  instructions: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});

export default PrinterTest;
