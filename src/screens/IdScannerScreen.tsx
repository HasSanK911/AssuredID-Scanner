import React, { useState } from 'react';
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
import { RootStackParamList } from '../../App';
import QRCodeGenerator from '../components/QRCodeGenerator';

type IdScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IdScanner'>;

interface Props {
  navigation: IdScannerScreenNavigationProp;
}

const IdScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [assuredId, setAssuredId] = useState('');

  const handleFind = () => {
    if (assuredId.trim() === '') {
      Alert.alert('Error', 'Please enter an Assured ID');
      return;
    }
    navigation.navigate('PatientDetails', { assuredId: assuredId.trim() });
  };

  const handleQRCodeScan = () => {
    navigation.navigate('QRScanner');
  };

  const handleGenerateQR = (generatedId: string) => {
    setAssuredId(generatedId);
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

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Assured ID</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={assuredId}
                onChangeText={setAssuredId}
                placeholder="Enter assured ID"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity style={styles.qrButton} onPress={handleQRCodeScan}>
                <Text style={styles.qrButtonText}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.findButton} onPress={handleFind}>
            <Text style={styles.findButtonText}>Find</Text>
          </TouchableOpacity>

          {/* <QRCodeGenerator onGenerate={handleGenerateQR} /> */}
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
  formContainer: {
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
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
    marginRight: 10,
  },
  qrButton: {
    backgroundColor: '#113493',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  findButton: {
    backgroundColor: '#113493',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IdScannerScreen;
