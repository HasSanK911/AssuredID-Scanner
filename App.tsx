import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet, useColorScheme, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import IdScannerScreen from './src/screens/IdScannerScreen';
import QRScannerScreen from './src/screens/QRScannerScreen';
import PatientDetailsScreen from './src/screens/PatientDetailsScreen';
import DrugSelectionScreen from './src/screens/DrugSelectionScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import LoginScreen from './src/screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  IdScanner: undefined;
  QRScanner: undefined;
  PatientDetails: { assuredId: string };
  DrugSelection: { patientName: string; claimStatus: string };
  Receipt: { 
    patientName: string; 
    selectedDrugs: Array<{
      name: string;
      price: number;
      size: string;
      currency: string;
    }>;
    totalAmount: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const handleLogout = (navigation: any) => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const LogoutButton = ({ navigation }: { navigation: any }) => (
    <TouchableOpacity
      onPress={() => handleLogout(navigation)}
      style={{
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
        Logout
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#113493',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ 
              headerShown: false,
              headerRight: () => null, // No logout button on login screen
            }}
          />
          <Stack.Screen 
            name="IdScanner" 
            component={IdScannerScreen} 
            options={{ title: 'ID Scanner' }}
          />
          <Stack.Screen 
            name="QRScanner" 
            component={QRScannerScreen} 
            options={{ 
              title: 'QR Scanner',
              headerStyle: {
                backgroundColor: '#113493',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen 
            name="PatientDetails" 
            component={PatientDetailsScreen} 
            options={{ title: 'Patient Details' }}
          />
          <Stack.Screen 
            name="DrugSelection" 
            component={DrugSelectionScreen} 
            options={{ title: 'Drug Selection' }}
          />
          <Stack.Screen 
            name="Receipt" 
            component={ReceiptScreen} 
            options={{ title: 'Receipt' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
