export type TransactionType =
  | 'SEND_MONEY'
  | 'RECEIVE_MONEY'
  | 'SCHOOL_FEE'
  | 'ADD_MONEY'
  | 'MERCHANT_PAY';

export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  amountPoisha: number; // Stored in poisha (e.g. 50000 = ৳500.00)
  currency: 'BDT';
  status: TransactionStatus;
  timestamp: string;
  referenceId: string;
  recipientOrSender?: string;
  feePoisha?: number;
}

export interface SchoolInvoice {
  id: string;
  schoolName: string;
  studentName: string;
  studentId: string;
  grade: string;
  feeType: string;
  month: string;
  amountPoisha: number;
  dueDate: string;
  status: 'UNPAID' | 'PAID' | 'OVERDUE';
}

export interface UserWallet {
  userName: string;
  userPhone: string;
  availableBalancePoisha: number;
  onHoldBalancePoisha: number;
  isBalanceHidden: boolean;
  kycStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
}
