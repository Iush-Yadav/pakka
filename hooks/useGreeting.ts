export function useGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return { greeting: 'Good morning', emoji: '🌤' };
  if (hour < 17) return { greeting: 'Good afternoon', emoji: '🌤' };
  if (hour < 21) return { greeting: 'Good evening', emoji: '🌅' };
  return { greeting: 'Good night', emoji: '🌙' };
}
