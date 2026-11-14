import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TransactionStatus } from '../types/wallet';
import { formatTaka } from '../utils/currency';

interface PaymentResultModalProps {
  visible: boolean;
  status: TransactionStatus;
  amountPoisha: number;
  recipientName: string;
  transactionId?: string;
  feePoisha?: number;
  onClose: () => void;
  onViewReceipt?: () => void;
}

export const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  visible,
  status,
  amountPoisha,
  recipientName,
  transactionId = 'TXN-BC-20261114',
  feePoisha = 0,
  onClose,
  onViewReceipt,
}) => {
  const isSuccess = status === 'SUCCESS';
  const isPending = status === 'PENDING';

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.card}>
          {/* Status Icon */}
          <View
            style={[
              styles.iconCircle,
              isSuccess
                ? styles.bgSuccess
                : isPending
                ? styles.bgPending
                : styles.bgFailed,
            ]}>
            <Ionicons
              name={
                isSuccess
                  ? 'checkmark'
                  : isPending
                  ? 'time-outline'
                  : 'alert-circle'
              }
              size={40}
              color="#FFFFFF"
            />
          </View>

          {/* Status Title & Message */}
          <Text style={styles.title}>
            {isSuccess
              ? 'Payment Successful!'
              : isPending
              ? 'Payment Pending'
              : 'Payment Failed'}
          </Text>

          <Text style={styles.message}>
            {isSuccess
              ? `You have successfully paid ${recipientName}.`
              : isPending
              ? 'Bank/MFS network is processing your request. Please do not retry to avoid double debits.'
              : 'Transaction could not be completed. Your account has not been charged.'}
          </Text>

          {/* Amount Box */}
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Total Amount Paid</Text>
            <Text style={styles.amountValue}>{formatTaka(amountPoisha)}</Text>
            {feePoisha > 0 && (
              <Text style={styles.feeText}>
                Includes Fee: {formatTaka(feePoisha)}
              </Text>
            )}
          </View>

          {/* Transaction Metadata */}
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Transaction ID</Text>
            <Text style={styles.metaValue}>{transactionId}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Paid To</Text>
            <Text style={styles.metaValue}>{recipientName}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Time</Text>
            <Text style={styles.metaValue}>Just now</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {isSuccess && onViewReceipt && (
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={onViewReceipt}
                activeOpacity={0.8}>
                <Ionicons name="document-text-outline" size={18} color="#2547E8" />
                <Text style={styles.secondaryBtnText}>View Receipt</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.primaryBtn,
                isPending && { backgroundColor: '#D97706' },
              ]}
              onPress={onClose}
              activeOpacity={0.8}>
              <Text style={styles.primaryBtnText}>
                {isSuccess ? 'Done' : 'Back to Home'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 27, 77, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bgSuccess: {
    backgroundColor: '#10B981',
  },
  bgPending: {
    backgroundColor: '#F59E0B',
  },
  bgFailed: {
    backgroundColor: '#EF4444',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  amountBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  amountLabel: {
    fontSize: 11,
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  amountValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0B1B4D',
    marginTop: 4,
  },
  feeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 6,
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: '#2547E8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    paddingVertical: 13,
    width: '100%',
    gap: 6,
  },
  secondaryBtnText: {
    color: '#2547E8',
    fontWeight: '700',
    fontSize: 14,
  },
});
