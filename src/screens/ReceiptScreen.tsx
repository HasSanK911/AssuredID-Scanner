import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { printReceiptSimple } from '../utils/simplePrintUtils';
import QRCode from 'react-native-qrcode-svg';
import SimpleBarcode from '../components/SimpleBarcode';

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
      setPrintStatus('Creating receipt...');
      const receiptData = {
        receiptId,
        claimNumber,
        currentDate,
        patientName,
        selectedDrugs,
        totalAmount
      };
      
      const printSuccess = await printReceiptSimple(receiptData);
      
      if (printSuccess) {
        setPrintStatus('Receipt processed successfully!');
        setIsPrinting(false);
        
        // Don't show alert here as it's handled in the print function
      } else {
        setPrintStatus('Printing failed.');
        setIsPrinting(false);
        Alert.alert('Error', 'Failed to print receipt. Please try again.');
      }
    } catch (error) {
      console.log('Print error:', error);
      setPrintStatus('Printing failed.');
      setIsPrinting(false);
      Alert.alert('Error', 'Failed to print receipt. Please try again.');
    }
  };



  const handleNewOrder = () => {
    Alert.alert(
      'New Order',
      'Do you want to start a new order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'IdScanner' }],
            }),
        },
      ]
    );
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
              {/* <Text style={styles.barcodeLabel}>QR Code:</Text> */}
              {/* <QRCode
                value={claimNumber}
                size={120}
                color="#000"
                backgroundColor="#fff"
              /> */}
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
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  receiptContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  claimSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  claimTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  claimNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#113493',
    marginBottom: 10,
  },
  barcodeContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  barcodeLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 5,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  receiptId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  receiptDate: {
    fontSize: 14,
    color: '#666',
  },
  patientSection: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 16,
    color: '#555',
  },
  itemsSection: {
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#113493',
  },
  totalSection: {
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: '#113493',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#113493',
  },
  actionsContainer: {
    gap: 15,
  },
  printButton: {
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
  printButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  newOrderButton: {
    backgroundColor: '#6c757d',
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
  newOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#113493',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ReceiptScreen;
