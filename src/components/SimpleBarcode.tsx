import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateTextBarcode } from '../utils/barcodeGenerator';

interface SimpleBarcodeProps {
  value: string;
  height?: number;
  width?: number;
  showText?: boolean;
}

const SimpleBarcode: React.FC<SimpleBarcodeProps> = ({
  value,
  height = 60,
  width = 300,
  showText = true,
}) => {
  const barcodePattern = generateTextBarcode(value);

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.barcodeContainer, { height }]}>
        <Text style={[styles.barcodeText, { fontSize: height / 4 }]}>
          {barcodePattern}
        </Text>
      </View>
      {showText && (
        <Text style={styles.barcodeValue}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  barcodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  barcodeText: {
    fontFamily: 'monospace',
    color: '#000',
    letterSpacing: 1,
  },
  barcodeValue: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});

export default SimpleBarcode;
