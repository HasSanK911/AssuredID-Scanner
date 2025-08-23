import { Share, Alert } from 'react-native';
import SunmiPrinter from '@mitsuharu/react-native-sunmi-printer-library';

export const printReceiptSimple = async (receiptData: {
  receiptId: string;
  claimNumber: string;
  currentDate: string;
  patientName: string;
  selectedDrugs: any[];
  totalAmount: number;
}): Promise<boolean> => {
  try {
    const { receiptId, claimNumber, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;
    
    // First try to print using Sunmi printer
    try {
      const printSuccess = await printReceiptWithSunmi(receiptData);
      if (printSuccess) {
        Alert.alert(
          'Print Success',
          'Receipt printed successfully on paper!',
          [{ text: 'OK' }]
        );
        return true;
      }
    } catch (printerError) {
      console.log('Sunmi printer error:', printerError);
      // Fall back to share method if printer fails
    }

    // Fallback: Create a formatted receipt text for sharing
    const receiptText = `
╔══════════════════════════════════════════════════════════════╗
║                    AssuredID Scanner - Receipt               ║
╠══════════════════════════════════════════════════════════════╣
║ Claim Number: ${claimNumber.padEnd(35)} ║
║ [${'█'.repeat(claimNumber.length)}] (Barcode)                    ║
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

    // Share the receipt as fallback
    await Share.share({
      message: receiptText,
      title: 'AssuredID Receipt',
    });

    Alert.alert(
      'Receipt Shared',
      'Printer not available. Receipt has been shared via the share menu.',
      [{ text: 'OK' }]
    );

    return true;
  } catch (error) {
    console.log('Print error:', error);
    Alert.alert(
      'Print Failed',
      'Failed to print or share receipt. Please try again.',
      [{ text: 'OK' }]
    );
    return false;
  }
};

export const printReceiptWithSunmi = async (receiptData: {
  receiptId: string;
  claimNumber: string;
  currentDate: string;
  patientName: string;
  selectedDrugs: any[];
  totalAmount: number;
}): Promise<boolean> => {
  try {
    const { receiptId, claimNumber, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;

    // Initialize printer
    await SunmiPrinter.initPrinter();
    await SunmiPrinter.setAlignment(1); // Center alignment
    await SunmiPrinter.setFontSize(24);
    await SunmiPrinter.printText('AssuredID Scanner - Receipt\n');
    await SunmiPrinter.printText('═══════════════════════════════════════════\n');
    
    // Print claim number
    await SunmiPrinter.setFontSize(20);
    await SunmiPrinter.printText(`Claim Number: ${claimNumber}\n`);
    
    // Print barcode
    await SunmiPrinter.printQRCode(claimNumber, 200, 200);
    await SunmiPrinter.printText('\n');
    
    await SunmiPrinter.setFontSize(16);
    await SunmiPrinter.printText(`Receipt ID: ${receiptId}\n`);
    await SunmiPrinter.printText(`Date: ${currentDate}\n`);
    await SunmiPrinter.printText(`Patient: ${patientName}\n`);
    await SunmiPrinter.printText('═══════════════════════════════════════════\n');
    
    // Print items
    await SunmiPrinter.printText('Items:\n');
    for (const drug of selectedDrugs) {
      await SunmiPrinter.printText(`• ${drug.name} (${drug.size})\n`);
      await SunmiPrinter.setAlignment(2); // Right alignment
      await SunmiPrinter.printText(`${drug.currency} ${drug.price.toFixed(2)}\n`);
      await SunmiPrinter.setAlignment(0); // Left alignment
    }
    
    await SunmiPrinter.printText('═══════════════════════════════════════════\n');
    
    // Print total
    await SunmiPrinter.setFontSize(20);
    await SunmiPrinter.setAlignment(2); // Right alignment
    await SunmiPrinter.printText(`Total: USD ${totalAmount.toFixed(2)}\n`);
    await SunmiPrinter.setAlignment(1); // Center alignment
    
    await SunmiPrinter.printText('═══════════════════════════════════════════\n');
    await SunmiPrinter.printText('Thank you for your purchase!\n');
    await SunmiPrinter.printText('\n\n\n'); // Feed paper
    
    // Cut paper
    await SunmiPrinter.paperCut();
    
    return true;
  } catch (error) {
    console.log('Sunmi printer error:', error);
    throw error;
  }
};

export const printReceiptText = async (receiptData: {
  receiptId: string;
  claimNumber: string;
  currentDate: string;
  patientName: string;
  selectedDrugs: any[];
  totalAmount: number;
}): Promise<boolean> => {
  try {
    const { receiptId, claimNumber, currentDate, patientName, selectedDrugs, totalAmount } = receiptData;
    
    // Create a simple text receipt
    const receiptText = `
AssuredID Scanner - Receipt

Claim Number: ${claimNumber}
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
