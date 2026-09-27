/**
 * Utility functions for formatting numbers, currency, dates, and percentages
 */

/**
 * Format currency to Indian Rupee (₹) format
 * @param {number|string} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Number(amount);
  return '₹' + num.toLocaleString('en-IN');
}

/**
 * Format probability or ratio to percentage string
 * @param {number} value - either 0.18 or 18
 * @param {number} decimals - decimal places (default: 1)
 * @returns {string} e.g. "18.0%"
 */
export function formatPercentage(value, decimals = 1) {
  if (value === undefined || value === null || isNaN(value)) return '0.0%';
  const num = Number(value);
  const normalized = num > 1 ? num : num * 100;
  return `${normalized.toFixed(decimals)}%`;
}

/**
 * Format date nicely, with "Today", "Yesterday" support or "MMM DD, YYYY"
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return '--';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);

  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  if (isYesterday) return 'Yesterday';

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format numbers with compact notation (e.g., 255.3K)
 * @param {number} num
 * @returns {string}
 */
export function formatCompactNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format numbers with commas (e.g. 255,347)
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return Number(num).toLocaleString('en-US');
}
