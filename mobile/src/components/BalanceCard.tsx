import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';
import { formatTaka } from '../utils/currency';

interface BalanceCardProps {
  userName: string;
  availableBalancePoisha: number;
  onHoldBalancePoisha?: number;
  onPayFeesPress: () => void;
  onSendPress: () => void;
  onAddMoneyPress: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  userName,
  availableBalancePoisha,
  onHoldBalancePoisha = 0,
  onPayFeesPress,
  onSendPress,
  onAddMoneyPress,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.card}>
      {/* Header with Greeting & Toggle */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <TouchableOpacity
          onPress={toggleVisibility}
          style={styles.eyeButton}
          activeOpacity={0.7}
          accessibilityLabel={isVisible ? 'Hide balance' : 'Show balance'}>
          <Ionicons
            name={isVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#94A3B8"
          />
          <Text style={styles.eyeButtonText}>
            {isVisible ? 'Hide' : 'Tap for Balance'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Balance Display */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>
          {isVisible ? formatTaka(availableBalancePoisha) : '৳ ••••••••'}
        </Text>
        {onHoldBalancePoisha > 0 && isVisible && (
          <Text style={styles.onHoldText}>
            On hold: {formatTaka(onHoldBalancePoisha)}
          </Text>
        )}
      </View>

      {/* Quick Action Buttons inside Card */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onPayFeesPress}
          activeOpacity={0.8}>
          <View style={[styles.iconCircle, { backgroundColor: '#2547E8' }]}>
            <Ionicons name="school-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionLabel}>Pay Fees</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onSendPress}
          activeOpacity={0.8}>
          <View style={[styles.iconCircle, { backgroundColor: '#3B82F6' }]}>
            <Ionicons name="paper-plane-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionLabel}>Send Money</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onAddMoneyPress}
          activeOpacity={0.8}>
          <View style={[styles.iconCircle, { backgroundColor: '#10B981' }]}>
            <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionLabel}>Add Money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.card, // #0B1B4D Deep Navy
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    shadowColor: '#0B1B4D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  nameText: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '700',
    marginTop: 2,
  },
  eyeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  eyeButtonText: {
    color: '#CBD5E1',
    fontSize: 11,
    marginLeft: 5,
    fontWeight: '600',
  },
  balanceContainer: {
    marginVertical: 4,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  onHoldText: {
    fontSize: 11,
    color: '#F59F00',
    marginTop: 4,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionBtn: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionLabel: {
    color: '#F1F5F9',
    fontSize: 12,
    fontWeight: '600',
  },
});
