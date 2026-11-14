import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { mockUserWallet } from '../data/mockData';

export default function ProfileScreen() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isScreenshotProtection, setIsScreenshotProtection] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account & Security</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {mockUserWallet.userName[0]}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{mockUserWallet.userName}</Text>
              <View style={styles.verifiedTag}>
                <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                <Text style={styles.verifiedText}>KYC Verified</Text>
              </View>
            </View>
            <Text style={styles.userPhone}>{mockUserWallet.userPhone}</Text>
            <Text style={styles.userRole}>
              Registered Parent (ID: BC-PAR-904)
            </Text>
          </View>
        </View>

        {/* Linked Bank Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Linked Bank Accounts</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Link Bank Account',
                  'Connecting through authorized NPSB / Partner Banking API.'
                )
              }>
              <Text style={styles.sectionActionText}>+ Link New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bankCard}>
            <View style={styles.bankIcon}>
              <Ionicons name="business" size={20} color="#2547E8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bankName}>BRAC Bank PLC</Text>
              <Text style={styles.bankAccountNo}>Savings •••••• 4892</Text>
            </View>
            <View style={styles.bankStatusBadge}>
              <Text style={styles.bankStatusText}>Primary</Text>
            </View>
          </View>
        </View>

        {/* Security & Authentication Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security & Privacy</Text>

          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingRow}
              onPress={() =>
                Alert.alert(
                  'Change PIN',
                  'Enter your existing 6-digit transaction PIN to set a new one.'
                )
              }>
              <View style={styles.settingIcon}>
                <Ionicons name="key-outline" size={18} color="#0B1B4D" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>
                  Change Transaction PIN
                </Text>
                <Text style={styles.settingSubLabel}>
                  Used to authorize every money transfer
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="finger-print-outline"
                  size={18}
                  color="#0B1B4D"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>Biometric Unlock</Text>
                <Text style={styles.settingSubLabel}>
                  Fingerprint or Face ID for app access
                </Text>
              </View>
              <Switch
                value={isBiometricEnabled}
                onValueChange={setIsBiometricEnabled}
                trackColor={{ false: '#CBD5E1', true: '#2547E8' }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Ionicons name="shield-outline" size={18} color="#0B1B4D" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>
                  Screen Capture Protection
                </Text>
                <Text style={styles.settingSubLabel}>
                  Blocks screenshots of PIN & balance (FLAG_SECURE)
                </Text>
              </View>
              <Switch
                value={isScreenshotProtection}
                onValueChange={setIsScreenshotProtection}
                trackColor={{ false: '#CBD5E1', true: '#10B981' }}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingRow}
              onPress={() =>
                Alert.alert(
                  'Active Devices',
                  '1 Active Device: Samsung Galaxy S24 Ultra (Current Device)'
                )
              }>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="phone-portrait-outline"
                  size={18}
                  color="#0B1B4D"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>Manage Active Devices</Text>
                <Text style={styles.settingSubLabel}>
                  1 trusted mobile device registered
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction Limits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction Limits</Text>
          <View style={styles.limitsCard}>
            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Daily Transfer Limit</Text>
              <Text style={styles.limitValue}>৳ 25,000.00</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '30%' }]} />
            </View>
            <Text style={styles.limitUsedText}>৳ 7,500.00 used today</Text>

            <View style={styles.divider} />

            <View style={styles.limitRow}>
              <Text style={styles.limitLabel}>Monthly School Fee Limit</Text>
              <Text style={styles.limitValue}>৳ 100,000.00</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to log out of EduPay?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive' },
            ])
          }
          activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color="#E03131" />
          <Text style={styles.logoutBtnText}>Log Out from Device</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0B1B4D',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0B1B4D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10B981',
  },
  userPhone: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  userRole: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  sectionActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2547E8',
  },
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  bankIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  bankAccountNo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  bankStatusBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bankStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2547E8',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  settingSubLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  limitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  limitLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  limitValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1B4D',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginVertical: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2547E8',
    borderRadius: 3,
  },
  limitUsedText: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    marginTop: 10,
  },
  logoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E03131',
  },
});
