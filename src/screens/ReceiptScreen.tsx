import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import SimpleBarcode from '../components/SimpleBarcode';

// Import Sunmi printer functions
import {
  prepare,
  setAlignment,
  setFontSize,
  printText,
  printBarcode,
  lineWrap,
  cutPaper,
} from '@mitsuharu/react-native-sunmi-printer-library';

type ReceiptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Receipt'>;
type ReceiptScreenRouteProp = RouteProp<RootStackParamList, 'Receipt'>;

interface Props {
  navigation: ReceiptScreenNavigationProp;
  route: ReceiptScreenRouteProp;
}

const ReceiptScreen: React.FC<Props> = ({ navigation, route }) => {
  const { patientName, selectedDrugs, totalAmount } = route.params;
  const [receiptId, setReceiptId] = useState('');
  const [claimNumber, setClaimNumber] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState('');

  useEffect(() => {
    // Generate receipt ID and current date
    const generateReceiptId = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      return `RCP-${timestamp}-${random}`;
    };

    // Generate claim number
    const generateClaimNumber = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 10000);
      return `CLM-${timestamp}-${random.toString().padStart(4, '0')}`;
    };

    const formatDate = () => {
      const now = new Date();
      return now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    setReceiptId(generateReceiptId());
    setClaimNumber(generateClaimNumber());
    setCurrentDate(formatDate());
  }, []);

  const handlePrint = async () => {
    setIsPrinting(true);
    setPrintStatus('Initializing printer...');
    
    try {
      if (!prepare) {
        throw new Error('Sunmi printer library is not available');
      }
      
      setPrintStatus('Connecting to printer...');
      await prepare();
      
      setPrintStatus('Printing receipt...');
      const receiptData = {
        receiptId,
        claimNumber,
        currentDate,
        patientName,
        selectedDrugs,
        totalAmount,
      };
      
      const printSuccess = await printReceiptWithSunmi(receiptData);
      
      if (printSuccess) {
        setPrintStatus('Receipt printed successfully!');
        Alert.alert('Print Success', 'Receipt printed successfully!', [{ text: 'OK' }]);
      } else {
        setPrintStatus('Printing failed.');
        Alert.alert('Error', 'Failed to print receipt. Please try again.');
      }
    } catch (error: any) {
      console.log('Print error:', error);
      setPrintStatus('Printer not available.');
    } finally {
      setIsPrinting(false);
    }
  };

  // Helper to align items & prices
  const formatLine = (name: string, size: string, price: number, currency: string) => {
    const item = `${name} (${size})`;
    const priceStr = `${currency} ${price.toFixed(2)}`;
    const lineWidth = 32; // common width for 58mm paper
    const spaceCount = lineWidth - item.length - priceStr.length;
    return item + ' '.repeat(spaceCount > 0 ? spaceCount : 1) + priceStr;
  };

  const printReceiptWithSunmi = async (receiptData: {
    receiptId: string;
    claimNumber: string;
    currentDate: string;
    patientName: string;
    selectedDrugs: any[];
    totalAmount: number;
  }): Promise<boolean> => {
    try {
      const { receiptId, claimNumber, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;

      // Header
      await setAlignment('center');
      await setFontSize(28);
      await printText('AssuredID Scanner - Receipt\n');
      await printText('========================================\n');

      // Claim Number & Barcode
      await setFontSize(22);
      await printBarcode(claimNumber, 'CODE128', 162, 2, 'textUnderBarcode');
      await lineWrap(1);

      // Receipt Details
      await setAlignment('left');
      await setFontSize(20);
      await printText(`Receipt ID: ${receiptId}\n`);
      await printText(`Date: ${currentDate}\n`);
      await printText(`Patient: ${patientName}\n`);
      await printText('----------------------------------------\n');

      // Items
      await printText('Items:\n');
      for (const drug of selectedDrugs) {
        const line = formatLine(drug.name, drug.size, drug.price, drug.currency);
        await printText(line + '\n');
      }

      await printText('----------------------------------------\n');

      // Total
      await setAlignment('right');
      await setFontSize(24);
      await printText(`Total: USD ${totalAmount.toFixed(2)}\n`);

      // Footer
      await setAlignment('center');
      await printText('========================================\n');
      await printText('Thank you for your purchase!\n');
      await lineWrap(1);

      await cutPaper();
      return true;
    } catch (error) {
      console.log('Sunmi printer error:', error);
      return false;
    }
  };

  const handleNewOrder = () => {
    Alert.alert('New Order', 'Do you want to start a new order?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'IdScanner' }],
          }),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.receiptContainer}>
        {/* Claim Number and Barcode Section */}
        <View style={styles.claimSection}>
          <Text style={styles.claimTitle}>Claim Number</Text>
          <Text style={styles.claimNumber}>{claimNumber}</Text>
          {claimNumber && (
            <View style={styles.barcodeContainer}>
              <Text style={styles.barcodeLabel}>Barcode:</Text>
              <SimpleBarcode
                value={claimNumber}
                height={50}
                width={280}
                showText={true}
              />
            </View>
          )}
        </View>

        <View style={styles.receiptHeader}>
          <Text style={styles.receiptTitle}>Receipt</Text>
          <Text style={styles.receiptId}>ID: {receiptId}</Text>
          <Text style={styles.receiptDate}>{currentDate}</Text>
        </View>

        <View style={styles.patientSection}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <Text style={styles.patientName}>{patientName}</Text>
        </View>

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Items Purchased</Text>
          {selectedDrugs.map((drug, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{drug.name}</Text>
                <Text style={styles.itemDetails}>{drug.size}</Text>
              </View>
              <Text style={styles.itemPrice}>
                {drug.currency} {drug.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>USD {totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {isPrinting && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{printStatus}</Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.printButton, isPrinting && styles.disabledButton]}
            onPress={handlePrint}
            disabled={isPrinting}
          >
            <Text style={styles.printButtonText}>
              {isPrinting ? 'Printing...' : 'Print Receipt'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.newOrderButton, isPrinting && styles.disabledButton]}
            onPress={handleNewOrder}
            disabled={isPrinting}
          >
            <Text style={styles.newOrderButtonText}>New Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  logoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 20 },
  logo: { width: 200, height: 120, elevation: 8 },
  receiptContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 25,
    elevation: 5,
  },
  claimSection: { alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  claimTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  claimNumber: { fontSize: 18, fontWeight: 'bold', color: '#113493', marginBottom: 10 },
  barcodeContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 10, elevation: 3 },
  barcodeLabel: { fontSize: 14, color: '#666', marginTop: 10, marginBottom: 5 },
  receiptHeader: { alignItems: 'center', marginBottom: 25, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  receiptTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  receiptId: { fontSize: 14, color: '#666', marginBottom: 5 },
  receiptDate: { fontSize: 14, color: '#666' },
  patientSection: { marginBottom: 25, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  patientName: { fontSize: 16, color: '#555' },
  itemsSection: { marginBottom: 25, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemDetails: { fontSize: 14, color: '#666' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#113493' },
  totalSection: { marginBottom: 30 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderTopWidth: 2, borderTopColor: '#113493' },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalAmount: { fontSize: 24, fontWeight: 'bold', color: '#113493' },
  actionsContainer: { gap: 15 },
  printButton: { backgroundColor: '#113493', borderRadius: 10, paddingVertical: 15, alignItems: 'center', elevation: 5 },
  printButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  newOrderButton: { backgroundColor: '#6c757d', borderRadius: 10, paddingVertical: 15, alignItems: 'center', elevation: 5 },
  newOrderButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statusContainer: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#113493' },
  statusText: { fontSize: 14, color: '#333', textAlign: 'center', fontStyle: 'italic' },
  disabledButton: { opacity: 0.6 },
});

export default ReceiptScreen;
