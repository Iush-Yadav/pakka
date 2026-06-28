import { activePacts } from '@/lib/mockData';

export function usePacts() {
  return {
    activePacts,
    loading: false,
  };
}

export function usePactById(id: string) {
  const pact = activePacts.find((p) => p.id === id) || activePacts[0];

  return {
    pact,
    loading: false,
  };
}
