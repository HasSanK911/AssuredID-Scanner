import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DrugSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DrugSelection'>;
type DrugSelectionScreenRouteProp = RouteProp<RootStackParamList, 'DrugSelection'>;

interface Props {
  navigation: DrugSelectionScreenNavigationProp;
  route: DrugSelectionScreenRouteProp;
}

interface Drug {
  id: string;
  name: string;
  price: number;
  size: string;
  currency: string;
}

const availableDrugs: Drug[] = [
  { id: '1', name: 'Aspirin', price: 5.99, size: '100mg', currency: 'USD' },
  { id: '2', name: 'Ibuprofen', price: 8.50, size: '200mg', currency: 'USD' },
  { id: '3', name: 'Paracetamol', price: 4.25, size: '500mg', currency: 'USD' },
  { id: '4', name: 'Omeprazole', price: 12.75, size: '20mg', currency: 'USD' },
  { id: '5', name: 'Metformin', price: 15.30, size: '500mg', currency: 'USD' },
  { id: '6', name: 'Lisinopril', price: 9.99, size: '10mg', currency: 'USD' },
];

const DrugSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { patientName, claimStatus } = route.params;
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);

  const toggleDrugSelection = (drugId: string) => {
    setSelectedDrugs(prev => 
      prev.includes(drugId) 
        ? prev.filter(id => id !== drugId)
        : [...prev, drugId]
    );
  };

  const calculateTotal = () => {
    return availableDrugs
      .filter(drug => selectedDrugs.includes(drug.id))
      .reduce((total, drug) => total + drug.price, 0);
  };

  const handleSubmit = () => {
    if (selectedDrugs.length === 0) {
      Alert.alert('Error', 'Please select at least one drug');
      return;
    }

    const selectedDrugsData = availableDrugs.filter(drug => selectedDrugs.includes(drug.id));
    const totalAmount = calculateTotal();

    navigation.navigate('Receipt', {
      patientName,
      selectedDrugs: selectedDrugsData,
      totalAmount,
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Select Drugs</Text>
          
          <View style={styles.drugsContainer}>
            {availableDrugs.map((drug) => (
              <TouchableOpacity
                key={drug.id}
                style={[
                  styles.drugButton,
                  selectedDrugs.includes(drug.id) && styles.selectedDrugButton
                ]}
                onPress={() => toggleDrugSelection(drug.id)}
              >
                <View style={styles.drugInfo}>
                  <Text style={styles.drugName}>{drug.name}</Text>
                  <Text style={styles.drugDetails}>
                    {drug.size} • {drug.currency} {drug.price.toFixed(2)}
                  </Text>
                </View>
                {selectedDrugs.includes(drug.id) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>USD {calculateTotal().toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.submitButton,
              selectedDrugs.length === 0 && styles.disabledButton
            ]} 
            onPress={handleSubmit}
            disabled={selectedDrugs.length === 0}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
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
  contentContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  drugsContainer: {
    marginBottom: 30,
  },
  drugButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDrugButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#113493',
    borderWidth: 2,
  },
  drugInfo: {
    flex: 1,
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  drugDetails: {
    fontSize: 14,
    color: '#666',
  },
  checkmark: {
    fontSize: 20,
    color: '#113493',
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#113493',
  },
  submitButton: {
    backgroundColor: '#113493',
    borderRadius: 8,
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DrugSelectionScreen;
