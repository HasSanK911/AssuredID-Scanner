// Simple TypeScript barcode generator for CODE128 format
// This creates a text-based barcode representation

interface BarcodePattern {
  [key: string]: string;
}

// CODE128 character patterns (simplified representation)
const CODE128_PATTERNS: BarcodePattern = {
  '0': '11011001100',
  '1': '11001101100',
  '2': '11001100110',
  '3': '10010011000',
  '4': '10010001100',
  '5': '10001001100',
  '6': '10011001000',
  '7': '10011000100',
  '8': '10001100100',
  '9': '11001001000',
  'A': '11001000100',
  'B': '11000100100',
  'C': '10110011100',
  'D': '10011011100',
  'E': '10011001110',
  'F': '10111001100',
  'G': '10011101100',
  'H': '10011100110',
  'I': '11001110010',
  'J': '11001011100',
  'K': '11001001110',
  'L': '11011100100',
  'M': '11001110100',
  'N': '11101101110',
  'O': '11101001100',
  'P': '11100101100',
  'Q': '11100100110',
  'R': '11101100100',
  'S': '11100110100',
  'T': '11100110010',
  'U': '11011011000',
  'V': '11011000110',
  'W': '11000110110',
  'X': '10100011000',
  'Y': '10001011000',
  'Z': '10001000110',
  '-': '10110111000',
  '.': '10110001110',
  ' ': '10001101110',
};

export const generateBarcode = (text: string): string => {
  if (!text || text.length === 0) return '';
  
  // Convert text to uppercase and filter valid characters
  const validText = text.toUpperCase().replace(/[^A-Z0-9\-\s\.]/g, '');
  
  if (validText.length === 0) return '';
  
  // Start character for CODE128
  const startChar = '11010010000';
  
  // Generate barcode pattern
  let barcodePattern = startChar;
  
  for (const char of validText) {
    const pattern = CODE128_PATTERNS[char];
    if (pattern) {
      barcodePattern += pattern;
    }
  }
  
  // Stop character
  barcodePattern += '1100011101011';
  
  // Convert pattern to visual representation
  return convertPatternToVisual(barcodePattern);
};

const convertPatternToVisual = (pattern: string): string => {
  let visual = '';
  for (const bit of pattern) {
    visual += bit === '1' ? '█' : ' ';
  }
  return visual;
};

export const generateSimpleBarcode = (text: string): string => {
  if (!text || text.length === 0) return '';
  
  // Create a simple visual barcode using alternating characters
  let barcode = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = char.charCodeAt(0);
    
    // Create bars based on character code
    const barLength = (charCode % 5) + 1;
    barcode += '█'.repeat(barLength) + ' ';
  }
  
  return barcode.trim();
};

export const generateTextBarcode = (text: string): string => {
  if (!text || text.length === 0) return '';
  
  // Create a text-based barcode representation
  const bars = text.split('').map(char => {
    const code = char.charCodeAt(0);
    return '█'.repeat((code % 4) + 1);
  });
  
  return bars.join(' ');
};
