import { Transaction, SchoolInvoice, UserWallet } from '../types/wallet';

export const mockUserWallet: UserWallet = {
  userName: 'Atul Paul',
  userPhone: '+880 1712-345678',
  availableBalancePoisha: 1245000, // ৳ 12,450.00
  onHoldBalancePoisha: 0,
  isBalanceHidden: false,
  kycStatus: 'VERIFIED',
};

export const mockInvoices: SchoolInvoice[] = [
  {
    id: 'INV-2026-001',
    schoolName: 'BrainCampus Model High School',
    studentName: 'Tahmid Islam',
    studentId: 'BC-2024-089',
    grade: 'Class 9 (Science)',
    feeType: 'Monthly Tuition Fee',
    month: 'November 2026',
    amountPoisha: 250000, // ৳ 2,500.00
    dueDate: '25 Nov 2026',
    status: 'UNPAID',
  },
  {
    id: 'INV-2026-002',
    schoolName: 'BrainCampus Model High School',
    studentName: 'Tahmid Islam',
    studentId: 'BC-2024-089',
    grade: 'Class 9 (Science)',
    feeType: 'Annual Sports & Lab Fee',
    month: 'November 2026',
    amountPoisha: 120000, // ৳ 1,200.00
    dueDate: '30 Nov 2026',
    status: 'UNPAID',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-984321',
    type: 'SCHOOL_FEE',
    title: 'BrainCampus Model School',
    subtitle: 'Tuition Fee (Oct 2026) - Tahmid',
    amountPoisha: 250000,
    currency: 'BDT',
    status: 'SUCCESS',
    timestamp: 'Today, 10:45 AM',
    referenceId: 'BC-FEE-882190',
    feePoisha: 0,
  },
  {
    id: 'TXN-984320',
    type: 'ADD_MONEY',
    title: 'Add Money via Bank',
    subtitle: 'BRAC Bank Linked Account',
    amountPoisha: 500000,
    currency: 'BDT',
    status: 'SUCCESS',
    timestamp: 'Yesterday, 04:12 PM',
    referenceId: 'BRAC-TR-554102',
  },
  {
    id: 'TXN-984319',
    type: 'MERCHANT_PAY',
    title: 'Campus Canteen & Stationery',
    subtitle: 'Counter QR Payment',
    amountPoisha: 18000,
    currency: 'BDT',
    status: 'SUCCESS',
    timestamp: '12 Nov 2026, 01:20 PM',
    referenceId: 'QR-CNT-1092',
    feePoisha: 0,
  },
  {
    id: 'TXN-984318',
    type: 'SEND_MONEY',
    title: 'Sent to Farhana Akter',
    subtitle: '+880 1823-456789',
    amountPoisha: 150000,
    currency: 'BDT',
    status: 'SUCCESS',
    timestamp: '10 Nov 2026, 06:15 PM',
    referenceId: 'TRF-P2P-4401',
    feePoisha: 500,
  },
];
