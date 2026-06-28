import { useState } from 'react';
import { todayHabits } from '@/lib/mockData';
import type { Habit } from '@/types';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(todayHabits);

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        // Cycle: pending → completed → missed → pending
        const nextStatus: Record<Habit['todayStatus'], Habit['todayStatus']> = {
          pending: 'completed',
          completed: 'missed',
          missed: 'pending',
        };

        return {
          ...habit,
          todayStatus: nextStatus[habit.todayStatus],
        };
      }),
    );
  };

  return {
    habits,
    toggleHabit,
    loading: false,
  };
}
