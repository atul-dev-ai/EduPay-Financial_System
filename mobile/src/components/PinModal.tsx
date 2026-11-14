import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import { formatTaka } from '../utils/currency';

interface PinModalProps {
  visible: boolean;
  title?: string;
  recipientName: string;
  amountPoisha: number;
  onCancel: () => void;
  onConfirm: (pin: string) => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  visible,
  title = 'Enter Transaction PIN',
  recipientName,
  amountPoisha,
  onCancel,
  onConfirm,
}) => {
  const [pin, setPin] = useState<string>('');

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 6) {
        setTimeout(() => {
          onConfirm(nextPin);
          setPin('');
        }, 200);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleClose = () => {
    setPin('');
    onCancel();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{ width: 32 }} />
          </View>

          {/* Transaction Summary */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryLabel}>Paying to</Text>
            <Text style={styles.summaryRecipient}>{recipientName}</Text>
            <Text style={styles.summaryAmount}>{formatTaka(amountPoisha)}</Text>
          </View>

          {/* Masked PIN Dots */}
          <View style={styles.dotsContainer}>
            {[...Array(6)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i < pin.length && styles.dotFilled,
                ]}
              />
            ))}
          </View>

          <Text style={styles.securityHint}>
            Never share your 6-digit PIN with anyone
          </Text>

          {/* Custom Numeric Keypad */}
          <View style={styles.keypad}>
            {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']].map(
              (row, rowIdx) => (
                <View key={rowIdx} style={styles.keypadRow}>
                  {row.map((digit) => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.key}
                      onPress={() => handleKeyPress(digit)}
                      activeOpacity={0.6}>
                      <Text style={styles.keyText}>{digit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )
            )}
            <View style={styles.keypadRow}>
              <TouchableOpacity
                style={styles.key}
                onPress={() => {}}
                activeOpacity={0.6}>
                <Ionicons name="finger-print" size={26} color="#2547E8" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={() => handleKeyPress('0')}
                activeOpacity={0.6}>
                <Text style={styles.keyText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.key}
                onPress={handleBackspace}
                activeOpacity={0.6}>
                <Ionicons name="backspace-outline" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 27, 77, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 14,
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  summaryBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  summaryRecipient: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  summaryAmount: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0B1B4D',
    marginTop: 6,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 18,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  dotFilled: {
    backgroundColor: '#2547E8',
    borderColor: '#2547E8',
  },
  securityHint: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 16,
  },
  keypad: {
    width: '100%',
    maxWidth: 320,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  key: {
    width: 80,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
});
