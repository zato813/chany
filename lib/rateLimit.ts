export const checkCheckoutRateLimit = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const LIMIT = 15;
  const HOUR_IN_MS = 60 * 60 * 1000;
  const now = Date.now();
  
  const stored = localStorage.getItem('chany_orders_limit');
  
  if (!stored) {
    localStorage.setItem('chany_orders_limit', JSON.stringify([{ time: now }]));
    return true;
  }
  
  let attempts = JSON.parse(stored);
  attempts = attempts.filter((a: any) => now - a.time < HOUR_IN_MS);
  
  if (attempts.length >= LIMIT) {
    localStorage.setItem('chany_orders_limit', JSON.stringify(attempts));
    return false;
  }
  
  attempts.push({ time: now });
  localStorage.setItem('chany_orders_limit', JSON.stringify(attempts));
  return true;
};