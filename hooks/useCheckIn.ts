import { useUIStore } from '@/stores/uiStore';

export function useCheckIn() {
  const { showToast } = useUIStore();

  const checkIn = async (_pactId: string): Promise<void> => {
    // Simulate check-in network request
    await new Promise((resolve) => setTimeout(resolve, 500));
    showToast('Pact check-in successful 🔥');
  };

  return {
    checkIn,
    loading: false,
  };
}
