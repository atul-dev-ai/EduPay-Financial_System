import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SchoolInvoice } from '../types/wallet';
import { formatTaka } from '../utils/currency';

interface SchoolFeeBannerProps {
  invoice: SchoolInvoice;
  onPayPress: (invoice: SchoolInvoice) => void;
}

export const SchoolFeeBanner: React.FC<SchoolFeeBannerProps> = ({
  invoice,
  onPayPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.tagBadge}>
          <Ionicons name="school" size={13} color="#2547E8" />
          <Text style={styles.tagText}>School Fee Due</Text>
        </View>
        <Text style={styles.dueDateText}>Due: {invoice.dueDate}</Text>
      </View>

      <Text style={styles.schoolName}>{invoice.schoolName}</Text>
      <Text style={styles.detailsText}>
        {invoice.studentName} • {invoice.grade}
      </Text>
      <Text style={styles.feeTypeText}>
        {invoice.feeType} ({invoice.month})
      </Text>

      <View style={styles.footerRow}>
        <View>
          <Text style={styles.amountLabel}>Total Payable</Text>
          <Text style={styles.amountText}>{formatTaka(invoice.amountPoisha)}</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => onPayPress(invoice)}
          activeOpacity={0.8}>
          <Text style={styles.payBtnText}>Pay Now</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2547E8',
    marginLeft: 4,
  },
  dueDateText: {
    fontSize: 11,
    color: '#E03131',
    fontWeight: '600',
  },
  schoolName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailsText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  feeTypeText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
    marginTop: 4,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  amountLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0B1B4D',
  },
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2547E8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
