import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types/wallet';
import { formatTaka } from '../utils/currency';

interface ReceiptModalProps {
  visible: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  visible,
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `EduPay Receipt: ${transaction.title}\nAmount: ${formatTaka(
          transaction.amountPoisha
        )}\nTxn ID: ${transaction.id}\nReference: ${transaction.referenceId}`,
      });
    } catch (e) {
      console.log('Error sharing receipt:', e);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Digital Receipt</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Receipt Card */}
          <View style={styles.receiptCard}>
            <View style={styles.badgeRow}>
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.statusText}>VERIFIED PAYMENT</Text>
              </View>
              <Text style={styles.brandTitle}>EduPay</Text>
            </View>

            <Text style={styles.receiptAmount}>
              {formatTaka(transaction.amountPoisha)}
            </Text>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text style={styles.detailValue}>{transaction.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Reference No</Text>
              <Text style={styles.detailValue}>{transaction.referenceId}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{transaction.timestamp}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>EduPay Core Wallet</Text>
            </View>
            {transaction.feePoisha !== undefined && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Convenience Fee</Text>
                <Text style={styles.detailValue}>
                  {formatTaka(transaction.feePoisha)}
                </Text>
              </View>
            )}

            <View style={styles.securitySeal}>
              <Ionicons name="shield-checkmark" size={16} color="#2547E8" />
              <Text style={styles.sealText}>
                Encrypted & Secured by BrainCampus Financial Core
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={handleShare}
              activeOpacity={0.8}>
              <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
              <Text style={styles.shareBtnText}>Share Receipt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={onClose}
              activeOpacity={0.8}>
              <Text style={styles.closeModalBtnText}>Close</Text>
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
    backgroundColor: 'rgba(11, 27, 77, 0.65)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#10B981',
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0B1B4D',
    letterSpacing: 0.5,
  },
  receiptAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0B1B4D',
    textAlign: 'center',
    marginTop: 6,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 4,
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  securitySeal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 18,
    gap: 6,
  },
  sealText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2547E8',
  },
  actions: {
    marginTop: 20,
    gap: 10,
  },
  shareBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2547E8',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  shareBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  closeModalBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeModalBtnText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 14,
  },
});
