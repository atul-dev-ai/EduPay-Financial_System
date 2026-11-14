/**
 * Converts poisha (integer minor units) to formatted Bangladeshi Taka string (৳).
 * e.g., 50000 poisha -> "৳ 500.00"
 */
export function formatTaka(poisha: number, includeDecimals = true): string {
  const taka = poisha / 100;
  if (!includeDecimals && Number.isInteger(taka)) {
    return `৳ ${taka.toLocaleString('en-IN')}`;
  }
  return `৳ ${taka.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Parses user Taka input (e.g. "500.50") into integer poisha (50050).
 */
export function takaToPoisha(takaInput: string | number): number {
  const num = typeof takaInput === 'string' ? parseFloat(takaInput) : takaInput;
  if (isNaN(num) || num < 0) return 0;
  return Math.round(num * 100);
}
