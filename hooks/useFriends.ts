import { friends } from '@/lib/mockData';

export function useFriends() {
  return {
    friends,
    loading: false,
  };
}
