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

type ReceiptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Receipt'>;
type ReceiptScreenRouteProp = RouteProp<RootStackParamList, 'Receipt'>;

interface Props {
  navigation: ReceiptScreenNavigationProp;
  route: ReceiptScreenRouteProp;
}

const ReceiptScreen: React.FC<Props> = ({ navigation, route }) => {
  const { patientName, selectedDrugs, totalAmount } = route.params;
  const [receiptId, setReceiptId] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Generate receipt ID and current date
    const generateReceiptId = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      return `RCP-${timestamp}-${random}`;
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
    setCurrentDate(formatDate());
  }, []);

  const handlePrint = async () => {
    try {
      // Create receipt content
      const receiptContent = `
AssuredID Scanner - Receipt

Receipt ID: ${receiptId}
Date: ${currentDate}
Patient: ${patientName}

Items:
${selectedDrugs.map(drug => 
  `${drug.name} (${drug.size}) - ${drug.currency} ${drug.price.toFixed(2)}`
).join('\n')}

Total: USD ${totalAmount.toFixed(2)}

Thank you for your purchase!
      `.trim();

      // Share the receipt (simulates printing)
      await Share.share({
        message: receiptContent,
        title: 'AssuredID Receipt',
      });

      Alert.alert(
        'Receipt Printed',
        'Your receipt has been generated and shared successfully!',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'IdScanner' }],
              }),
          },
        ]
      );
    } catch (error) {
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

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
            <Text style={styles.printButtonText}>Print Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.newOrderButton} onPress={handleNewOrder}>
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
});

export default ReceiptScreen;
