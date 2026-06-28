import { useState } from 'react';
import { userStats } from '@/lib/mockData';

export function useStats() {
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');

  return {
    stats: userStats,
    period,
    setPeriod,
    loading: false,
  };
}
