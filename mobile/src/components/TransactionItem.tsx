import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types/wallet';
import { formatTaka } from '../utils/currency';

interface TransactionItemProps {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
}) => {
  const getIconConfig = () => {
    switch (transaction.type) {
      case 'SCHOOL_FEE':
        return { name: 'school' as const, bg: '#EEF2FF', color: '#2547E8' };
      case 'ADD_MONEY':
        return { name: 'arrow-down' as const, bg: '#ECFDF5', color: '#10B981' };
      case 'MERCHANT_PAY':
        return { name: 'qr-code' as const, bg: '#FDF4FF', color: '#A855F7' };
      case 'RECEIVE_MONEY':
        return { name: 'arrow-down' as const, bg: '#ECFDF5', color: '#10B981' };
      case 'SEND_MONEY':
      default:
        return { name: 'arrow-up' as const, bg: '#FFF1F2', color: '#F43F5E' };
    }
  };

  const isIncome =
    transaction.type === 'ADD_MONEY' || transaction.type === 'RECEIVE_MONEY';
  const iconConfig = getIconConfig();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(transaction)}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: iconConfig.bg }]}>
        <Ionicons name={iconConfig.name} size={20} color={iconConfig.color} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {transaction.subtitle}
        </Text>
        <Text style={styles.time}>{transaction.timestamp}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: isIncome ? '#10B981' : '#0F172A' },
          ]}>
          {isIncome ? '+' : '-'} {formatTaka(transaction.amountPoisha)}
        </Text>

        {transaction.status === 'PENDING' && (
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>Pending</Text>
          </View>
        )}
        {transaction.status === 'FAILED' && (
          <View style={styles.failedBadge}>
            <Text style={styles.failedText}>Failed</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  time: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  pendingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
  },
  failedBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  failedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#DC2626',
  },
});
