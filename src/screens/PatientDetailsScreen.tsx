import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
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

type PatientDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PatientDetails'>;
type PatientDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PatientDetails'>;

interface Props {
  navigation: PatientDetailsScreenNavigationProp;
  route: PatientDetailsScreenRouteProp;
}

interface PatientData {
  name: string;
  claimStatus: string;
}

const PatientDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { assuredId } = route.params;
  console.log('PatientDetailsScreen rendered with assuredId:', assuredId);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch patient data
    const fetchPatientData = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      
      // Mock data based on assured ID
      const mockData: PatientData = {
        name: 'John Doe',
        claimStatus: 'Active',
      };
      
      setPatientData(mockData);
      setLoading(false);
    };

    fetchPatientData();
  }, [assuredId]);

  const handleSelectDrugs = () => {
    if (patientData) {
      navigation.navigate('DrugSelection', {
        patientName: patientData.name,
        claimStatus: patientData.claimStatus,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading patient details...</Text>
      </View>
    );
  }

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

        <View style={styles.detailsContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Patient Name:</Text>
            <TextInput
              style={styles.valueInput}
              value={patientData?.name || ''}
              editable={false}
            />
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Claim Status:</Text>
            <Text style={styles.statusText}>{patientData?.claimStatus}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Assured ID:</Text>
            <Text style={styles.statusText}>{assuredId}</Text>
          </View>

          

          

          <TouchableOpacity style={styles.selectDrugsButton} onPress={handleSelectDrugs}>
            <Text style={styles.selectDrugsButtonText}>Select Drugs</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
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
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  valueInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  statusText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
  },
  selectDrugsButton: {
    backgroundColor: '#113493',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectDrugsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PatientDetailsScreen;
