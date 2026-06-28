import { create } from 'zustand';
import type { User, UserStats, Transaction, AppNotification } from '@/types';
import { currentUser, userStats as initialUserStats, mockTransactions, mockNotifications } from '@/lib/mockData';

interface UserState {
  user: User;
  stats: UserStats;
  transactions: Transaction[];
  notifications: AppNotification[];
  
  // Actions
  addTransaction: (tx: Transaction) => void;
  markNotificationRead: (id: string) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: currentUser,
  stats: initialUserStats,
  transactions: mockTransactions,
  notifications: mockNotifications,
  
  addTransaction: (tx) => set((state) => ({ 
    transactions: [tx, ...state.transactions],
    user: { 
      ...state.user, 
      walletBalance: tx.type === 'deposit' 
        ? state.user.walletBalance - tx.amount // Deposit removes from wallet to hold in escrow
        : tx.type === 'refund' 
          ? state.user.walletBalance + tx.amount 
          : state.user.walletBalance
    }
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  
  updateUser: (updates) => set((state) => ({
    user: { ...state.user, ...updates }
  }))
}));
