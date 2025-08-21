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

const PrinterTest: React.FC = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testPrinterConnection = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      addResult('Starting receipt sharing test...');
      
      // Test 1: Create test receipt data
      addResult('Creating test receipt...');
      const testReceiptData = {
        receiptId: 'TEST-' + Date.now(),
        currentDate: new Date().toLocaleString(),
        patientName: 'Test Patient',
        selectedDrugs: [
          { name: 'Test Drug 1', size: '100mg', currency: 'USD', price: 25.99 },
          { name: 'Test Drug 2', size: '50mg', currency: 'USD', price: 15.50 }
        ],
        totalAmount: 41.49
      };

      // Test 2: Try to share the receipt
      addResult('Testing receipt sharing...');
      const printSuccess = await printReceiptSimple(testReceiptData);
      
      if (printSuccess) {
        addResult('✅ Receipt shared successfully!');
        addResult('You can now print it from the share menu.');
        Alert.alert(
          'Test Complete',
          'Receipt sharing test completed successfully! Check the share menu for printing options.',
          [{ text: 'OK' }]
        );
      } else {
        addResult('❌ Failed to share receipt');
        Alert.alert(
          'Test Failed',
          'Receipt sharing test failed. Check the results above for details.',
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
        <Text style={styles.title}>Receipt Test</Text>
        <Text style={styles.subtitle}>Test receipt sharing and printing</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.testButton, isTesting && styles.disabledButton]}
          onPress={testPrinterConnection}
          disabled={isTesting}
        >
          <Text style={styles.testButtonText}>
            {isTesting ? 'Testing...' : 'Run Receipt Test'}
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
        <Text style={styles.instructionText}>• Tap "Run Receipt Test" to test receipt sharing</Text>
        <Text style={styles.instructionText}>• The receipt will be shared via the device's share menu</Text>
        <Text style={styles.instructionText}>• You can print it from the share menu options</Text>
        <Text style={styles.instructionText}>• This tests the same functionality used in the main app</Text>
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
