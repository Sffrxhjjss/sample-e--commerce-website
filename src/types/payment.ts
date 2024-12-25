export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
}