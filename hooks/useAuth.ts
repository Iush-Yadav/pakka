import { useAuthStore } from '@/stores/authStore';
import { currentUser } from '@/lib/mockData';

export function useAuth() {
  const { user, isLoading, isAuthenticated, setUser, setLoading, logout: storeLogout } =
    useAuthStore();

  /**
   * Mock OTP send — simulates a brief loading state.
   * In production, replace with:
   *   signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
   */
  const sendOTP = async (_phoneNumber: string): Promise<void> => {
    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  /**
   * Mock OTP verification — accepts any code and sets the mock user.
   * In production, replace with:
   *   confirmationResult.confirm(code)
   */
  const verifyOTP = async (_code: string): Promise<void> => {
    setLoading(true);
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setUser(currentUser);
    setLoading(false);
  };

  /**
   * Signs out the current user and clears the auth store.
   * In production, also call: firebaseSignOut(auth)
   */
  const signOut = async (): Promise<void> => {
    setLoading(true);
    // Simulate sign-out delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    storeLogout();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    sendOTP,
    verifyOTP,
    signOut,
  };
}
