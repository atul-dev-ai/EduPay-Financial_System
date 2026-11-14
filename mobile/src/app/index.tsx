import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { BalanceCard } from '../components/BalanceCard';
import { SchoolFeeBanner } from '../components/SchoolFeeBanner';
import { TransactionItem } from '../components/TransactionItem';
import { PinModal } from '../components/PinModal';
import { PaymentResultModal } from '../components/PaymentResultModal';
import { ReceiptModal } from '../components/ReceiptModal';

import {
  mockUserWallet,
  mockInvoices,
  mockTransactions,
} from '../data/mockData';
import { Transaction, SchoolInvoice, TransactionStatus } from '../types/wallet';

export default function HomeScreen() {
  const router = useRouter();
  const [wallet, setWallet] = useState(mockUserWallet);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedInvoice, setSelectedInvoice] = useState<SchoolInvoice | null>(
    mockInvoices[0]
  );

  // Modals state
  const [isPinModalVisible, setIsPinModalVisible] = useState(false);
  const [activePayment, setActivePayment] = useState<{
    recipientName: string;
    amountPoisha: number;
    feePoisha: number;
  } | null>(null);

  const [resultModal, setResultModal] = useState<{
    visible: boolean;
    status: TransactionStatus;
    amountPoisha: number;
    recipientName: string;
    transactionId: string;
  }>({
    visible: false,
    status: 'SUCCESS',
    amountPoisha: 0,
    recipientName: '',
    transactionId: '',
  });

  const [selectedTransactionForReceipt, setSelectedTransactionForReceipt] =
    useState<Transaction | null>(null);

  // Trigger Pay Fees from Home
  const handlePayFee = (invoice: SchoolInvoice) => {
    setActivePayment({
      recipientName: invoice.schoolName,
      amountPoisha: invoice.amountPoisha,
      feePoisha: 0,
    });
    setIsPinModalVisible(true);
  };

  // Confirm PIN & Execute Transaction
  const handleConfirmPin = (pin: string) => {
    setIsPinModalVisible(false);
    if (!activePayment) return;

    // Deduct from wallet balance (Poisha)
    const newTxnId = `TXN-BC-${Math.floor(100000 + Math.random() * 900000)}`;
    setWallet((prev) => ({
      ...prev,
      availableBalancePoisha: Math.max(
        0,
        prev.availableBalancePoisha - activePayment.amountPoisha
      ),
    }));

    // Prepend new transaction to recent list
    const newTxn: Transaction = {
      id: newTxnId,
      type: 'SCHOOL_FEE',
      title: activePayment.recipientName,
      subtitle: 'Tuition Fee Payment (Nov 2026)',
      amountPoisha: activePayment.amountPoisha,
      currency: 'BDT',
      status: 'SUCCESS',
      timestamp: 'Just now',
      referenceId: 'BC-PAY-2026',
      feePoisha: activePayment.feePoisha,
    };
    setTransactions([newTxn, ...transactions]);

    // Show result modal
    setResultModal({
      visible: true,
      status: 'SUCCESS',
      amountPoisha: activePayment.amountPoisha,
      recipientName: activePayment.recipientName,
      transactionId: newTxnId,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Top App Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.appTitle}>BrainCampus Pay</Text>
            <View style={styles.kycBadge}>
              <Ionicons name="checkmark-circle" size={10} color="#10B981" />
              <Text style={styles.kycText}>Verified Parent</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.push('/pay')}>
            <Ionicons name="qr-code-outline" size={20} color="#0B1B4D" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="notifications-outline" size={20} color="#0B1B4D" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Main Balance Card */}
        <BalanceCard
          userName={wallet.userName}
          availableBalancePoisha={wallet.availableBalancePoisha}
          onHoldBalancePoisha={wallet.onHoldBalancePoisha}
          onPayFeesPress={() => {
            if (selectedInvoice) handlePayFee(selectedInvoice);
          }}
          onSendPress={() => router.push('/pay')}
          onAddMoneyPress={() => {
            setActivePayment({
              recipientName: 'BRAC Bank Linked Account',
              amountPoisha: 500000,
              feePoisha: 0,
            });
            setIsPinModalVisible(true);
          }}
        />

        {/* Quick Services Grid */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Campus Services</Text>
          <View style={styles.servicesGrid}>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => {
                if (selectedInvoice) handlePayFee(selectedInvoice);
              }}>
              <View
                style={[
                  styles.serviceIconContainer,
                  { backgroundColor: '#EEF2FF' },
                ]}>
                <Ionicons name="school" size={22} color="#2547E8" />
              </View>
              <Text style={styles.serviceText}>School Fees</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => router.push('/pay')}>
              <View
                style={[
                  styles.serviceIconContainer,
                  { backgroundColor: '#FDF4FF' },
                ]}>
                <Ionicons name="qr-code" size={22} color="#9333EA" />
              </View>
              <Text style={styles.serviceText}>Scan & Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => router.push('/pay')}>
              <View
                style={[
                  styles.serviceIconContainer,
                  { backgroundColor: '#EFF6FF' },
                ]}>
                <Ionicons name="paper-plane" size={22} color="#3B82F6" />
              </View>
              <Text style={styles.serviceText}>Send Money</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => {
                setActivePayment({
                  recipientName: 'Bank Add Money',
                  amountPoisha: 200000,
                  feePoisha: 0,
                });
                setIsPinModalVisible(true);
              }}>
              <View
                style={[
                  styles.serviceIconContainer,
                  { backgroundColor: '#ECFDF5' },
                ]}>
                <Ionicons name="add-circle" size={22} color="#10B981" />
              </View>
              <Text style={styles.serviceText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* School Fee Invoice Banner (if unpaid invoices exist) */}
        {selectedInvoice && (
          <View>
            <Text style={styles.sectionTitle}>Outstanding Invoices</Text>
            <SchoolFeeBanner
              invoice={selectedInvoice}
              onPayPress={handlePayFee}
            />
          </View>
        )}

        {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/activity')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.slice(0, 5).map((txn) => (
            <TransactionItem
              key={txn.id}
              transaction={txn}
              onPress={(t) => setSelectedTransactionForReceipt(t)}
            />
          ))}
        </View>
      </ScrollView>

      {/* PIN Verification Modal */}
      {activePayment && (
        <PinModal
          visible={isPinModalVisible}
          recipientName={activePayment.recipientName}
          amountPoisha={activePayment.amountPoisha}
          onCancel={() => setIsPinModalVisible(false)}
          onConfirm={handleConfirmPin}
        />
      )}

      {/* Transaction Result Modal */}
      <PaymentResultModal
        visible={resultModal.visible}
        status={resultModal.status}
        amountPoisha={resultModal.amountPoisha}
        recipientName={resultModal.recipientName}
        transactionId={resultModal.transactionId}
        onClose={() => setResultModal((prev) => ({ ...prev, visible: false }))}
        onViewReceipt={() => {
          const t = transactions.find((x) => x.id === resultModal.transactionId);
          setResultModal((prev) => ({ ...prev, visible: false }));
          if (t) setSelectedTransactionForReceipt(t);
        }}
      />

      {/* Digital Receipt Modal */}
      <ReceiptModal
        visible={!!selectedTransactionForReceipt}
        transaction={selectedTransactionForReceipt}
        onClose={() => setSelectedTransactionForReceipt(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#2547E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0B1B4D',
    letterSpacing: -0.2,
  },
  kycBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  kycText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#E03131',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  servicesSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceItem: {
    alignItems: 'center',
    flex: 1,
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  transactionsSection: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2547E8',
  },
});
