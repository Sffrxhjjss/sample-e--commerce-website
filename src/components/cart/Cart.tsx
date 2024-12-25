import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemComponent } from './CartItem';
import { CartItem } from '../../types';
import { calculateTotal } from '../../utils/cart';
import { PaymentModal } from '../payment/PaymentModal';
import { useAuth } from '../../context/AuthContext';
import { LoginModal } from '../auth/LoginModal';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutSuccess: () => void;
}

export function Cart({ items, onClose, onUpdateQuantity, onRemoveItem, onCheckoutSuccess }: CartProps) {
  const { isAuthenticated } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const total = calculateTotal(items);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    onCheckoutSuccess();
    onClose();
  };

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-center text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
        />
      )}

      {showPayment && (
        <PaymentModal
          items={items}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}