import { Share, Alert } from 'react-native';

export const printReceiptSimple = async (receiptData: {
  receiptId: string;
  currentDate: string;
  patientName: string;
  selectedDrugs: any[];
  totalAmount: number;
}): Promise<boolean> => {
  try {
    const { receiptId, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;
    
    // Create a formatted receipt text
    const receiptText = `
╔══════════════════════════════════════════════════════════════╗
║                    AssuredID Scanner - Receipt               ║
╠══════════════════════════════════════════════════════════════╣
║ Receipt ID: ${receiptId.padEnd(40)} ║
║ Date: ${currentDate.padEnd(45)} ║
║ Patient: ${patientName.padEnd(42)} ║
╠══════════════════════════════════════════════════════════════╣
║ Items:                                                        ║
${selectedDrugs.map(drug => 
  `║ • ${drug.name} (${drug.size})`.padEnd(50) + 
  `${drug.currency} ${drug.price.toFixed(2)}`.padStart(10) + ' ║'
).join('\n')}
╠══════════════════════════════════════════════════════════════╣
║ Total: ${'USD ' + totalAmount.toFixed(2).padStart(40)} ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║           Thank you for your purchase!                      ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `.trim();

    // Share the receipt
    await Share.share({
      message: receiptText,
      title: 'AssuredID Receipt',
    });

    Alert.alert(
      'Receipt Shared',
      'Your receipt has been shared successfully! You can print it from the share menu.',
      [{ text: 'OK' }]
    );

    return true;
  } catch (error) {
    console.log('Simple print error:', error);
    Alert.alert(
      'Print Failed',
      'Failed to share receipt. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};

export const printReceiptText = async (receiptData: {
  receiptId: string;
  currentDate: string;
  patientName: string;
  selectedDrugs: any[];
  totalAmount: number;
}): Promise<boolean> => {
  try {
    const { receiptId, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;
    
    // Create a simple text receipt
    const receiptText = `
AssuredID Scanner - Receipt

Receipt ID: ${receiptId}
Date: ${currentDate}
Patient: ${patientName}

Items:
${selectedDrugs.map(drug => 
  `• ${drug.name} (${drug.size}) - ${drug.currency} ${drug.price.toFixed(2)}`
).join('\n')}

Total: USD ${totalAmount.toFixed(2)}

Thank you for your purchase!
    `.trim();

    // Share the receipt
    await Share.share({
      message: receiptText,
      title: 'AssuredID Receipt',
    });

    Alert.alert(
      'Receipt Shared',
      'Your receipt has been shared successfully! You can print it from the share menu.',
      [{ text: 'OK' }]
    );

    return true;
  } catch (error) {
    console.log('Text print error:', error);
    Alert.alert(
      'Print Failed',
      'Failed to share receipt. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};
