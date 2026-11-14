import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { PinModal } from '../components/PinModal';
import { PaymentResultModal } from '../components/PaymentResultModal';
import { formatTaka, takaToPoisha } from '../utils/currency';
import { mockInvoices } from '../data/mockData';
import { TransactionStatus } from '../types/wallet';

type PayMode = 'SCHOOL_FEES' | 'SCAN_QR' | 'SEND_MONEY';

export default function PayScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<PayMode>('SCHOOL_FEES');

  // Form states
  const [studentId, setStudentId] = useState('BC-2024-089');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [amountInput, setAmountInput] = useState('2500');
  const [note, setNote] = useState('');

  // Selected invoice
  const [selectedInvoice, setSelectedInvoice] = useState(mockInvoices[0]);

  // Modal states
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
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

  const getRecipientName = () => {
    if (mode === 'SCHOOL_FEES') return selectedInvoice.schoolName;
    if (mode === 'SCAN_QR') return 'Campus Canteen & Store (Counter 2)';
    return recipientPhone || 'Recipient Wallet';
  };

  const getAmountPoisha = () => {
    if (mode === 'SCHOOL_FEES') return selectedInvoice.amountPoisha;
    return takaToPoisha(amountInput);
  };

  const handleProceed = () => {
    setIsPinModalOpen(true);
  };

  const handleConfirmPin = (pin: string) => {
    setIsPinModalOpen(false);
    const newTxnId = `TXN-EP-${Math.floor(100000 + Math.random() * 900000)}`;

    setResultModal({
      visible: true,
      status: 'SUCCESS',
      amountPoisha: getAmountPoisha(),
      recipientName: getRecipientName(),
      transactionId: newTxnId,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay & Transfer</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Mode Tabs */}
        <View style={styles.modeTabs}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              mode === 'SCHOOL_FEES' && styles.tabBtnActive,
            ]}
            onPress={() => setMode('SCHOOL_FEES')}
            activeOpacity={0.8}>
            <Ionicons
              name="school-outline"
              size={16}
              color={mode === 'SCHOOL_FEES' ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                mode === 'SCHOOL_FEES' && styles.tabTextActive,
              ]}>
              School Fees
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, mode === 'SCAN_QR' && styles.tabBtnActive]}
            onPress={() => setMode('SCAN_QR')}
            activeOpacity={0.8}>
            <Ionicons
              name="qr-code-outline"
              size={16}
              color={mode === 'SCAN_QR' ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                mode === 'SCAN_QR' && styles.tabTextActive,
              ]}>
              Scan QR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              mode === 'SEND_MONEY' && styles.tabBtnActive,
            ]}
            onPress={() => setMode('SEND_MONEY')}
            activeOpacity={0.8}>
            <Ionicons
              name="paper-plane-outline"
              size={16}
              color={mode === 'SEND_MONEY' ? '#FFFFFF' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                mode === 'SEND_MONEY' && styles.tabTextActive,
              ]}>
              Send
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content by Mode */}
        {mode === 'SCHOOL_FEES' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Student & Invoice Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Student ID</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="id-card-outline" size={18} color="#64748B" />
                <TextInput
                  style={styles.textInput}
                  value={studentId}
                  onChangeText={setStudentId}
                  placeholder="Enter Student ID (e.g. BC-2024-089)"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            {/* Resolved Student Invoice Card */}
            <View style={styles.invoicePreview}>
              <View style={styles.previewHeader}>
                <View style={styles.studentBadge}>
                  <Ionicons name="person-circle" size={16} color="#2547E8" />
                  <Text style={styles.studentName}>
                    {selectedInvoice.studentName}
                  </Text>
                </View>
                <Text style={styles.gradeText}>{selectedInvoice.grade}</Text>
              </View>

              <Text style={styles.schoolNameText}>
                {selectedInvoice.schoolName}
              </Text>
              <Text style={styles.invoiceDesc}>
                {selectedInvoice.feeType} • {selectedInvoice.month}
              </Text>

              <View style={styles.divider} />

              <View style={styles.payableRow}>
                <Text style={styles.payableLabel}>Tuition Fee Amount</Text>
                <Text style={styles.payableAmount}>
                  {formatTaka(selectedInvoice.amountPoisha)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {mode === 'SCAN_QR' && (
          <View style={styles.card}>
            {/* Simulated QR Viewfinder */}
            <View style={styles.qrScannerFrame}>
              <Ionicons name="scan-outline" size={80} color="#2547E8" />
              <Text style={styles.qrPrompt}>
                Align QR Code within the frame
              </Text>
              <Text style={styles.qrSubPrompt}>
                Supports BrainCampus Bangla QR, Canteen & Bookshop QRs
              </Text>
            </View>

            <View style={styles.merchantInfoBox}>
              <View style={styles.merchantIcon}>
                <Ionicons name="storefront" size={20} color="#9333EA" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.merchantTitle}>
                  Campus Canteen & Store
                </Text>
                <Text style={styles.merchantSub}>
                  Counter 2 • Verified Campus Merchant
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Enter Amount (৳)</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencyPrefix}>৳</Text>
                <TextInput
                  style={[styles.textInput, styles.amountInputText]}
                  value={amountInput}
                  onChangeText={setAmountInput}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          </View>
        )}

        {mode === 'SEND_MONEY' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Send Money to User</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Recipient Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={18} color="#64748B" />
                <TextInput
                  style={styles.textInput}
                  value={recipientPhone}
                  onChangeText={setRecipientPhone}
                  keyboardType="phone-pad"
                  placeholder="017XXXXXXXX"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Amount (৳)</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencyPrefix}>৳</Text>
                <TextInput
                  style={[styles.textInput, styles.amountInputText]}
                  value={amountInput}
                  onChangeText={setAmountInput}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            {/* Quick Amount Chips */}
            <View style={styles.chipsRow}>
              {['500', '1000', '2000', '5000'].map((chip) => (
                <TouchableOpacity
                  key={chip}
                  style={styles.chip}
                  onPress={() => setAmountInput(chip)}>
                  <Text style={styles.chipText}>৳ {chip}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Reference Note (Optional)</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="chatbox-outline" size={18} color="#64748B" />
                <TextInput
                  style={styles.textInput}
                  value={note}
                  onChangeText={setNote}
                  placeholder="e.g. Tiffin, books"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleProceed}
          activeOpacity={0.8}>
          <Text style={styles.submitBtnText}>
            Proceed with {formatTaka(getAmountPoisha())}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>

      {/* PIN Verification Modal */}
      <PinModal
        visible={isPinModalOpen}
        recipientName={getRecipientName()}
        amountPoisha={getAmountPoisha()}
        onCancel={() => setIsPinModalOpen(false)}
        onConfirm={handleConfirmPin}
      />

      {/* Transaction Result Modal */}
      <PaymentResultModal
        visible={resultModal.visible}
        status={resultModal.status}
        amountPoisha={resultModal.amountPoisha}
        recipientName={resultModal.recipientName}
        transactionId={resultModal.transactionId}
        onClose={() => {
          setResultModal((prev) => ({ ...prev, visible: false }));
          router.replace('/');
        }}
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0B1B4D',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 14,
    padding: 4,
    marginVertical: 12,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: '#2547E8',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    height: 48,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#0F172A',
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2547E8',
  },
  amountInputText: {
    fontSize: 18,
    fontWeight: '700',
  },
  invoicePreview: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  studentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  studentName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E40AF',
  },
  gradeText: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '600',
  },
  schoolNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  invoiceDesc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#C7D2FE',
    marginVertical: 12,
  },
  payableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payableLabel: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  payableAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E3A8A',
  },
  qrScannerFrame: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  qrPrompt: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 8,
  },
  qrSubPrompt: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 20,
  },
  merchantInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F3E8FF',
  },
  merchantIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  merchantTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#581C87',
  },
  merchantSub: {
    fontSize: 11,
    color: '#7E22CE',
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2547E8',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#2547E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
