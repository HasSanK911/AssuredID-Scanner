import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onGenerate: (qrData: string) => void;
}

const QRCodeGenerator: React.FC<Props> = ({ onGenerate }) => {
  const generateTestQR = () => {
    const testId = 'ASID123456789';
    onGenerate(testId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test QR Code Generator</Text>
      <Text style={styles.subtitle}>Generate a test QR code for scanning</Text>
      
      <TouchableOpacity style={styles.generateButton} onPress={generateTestQR}>
        <Text style={styles.generateButtonText}>Generate Test QR Code</Text>
      </TouchableOpacity>
      
      <Text style={styles.instructions}>
        This will generate a QR code containing: ASID123456789
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  generateButton: {
    backgroundColor: '#113493',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default QRCodeGenerator;
