export const formatCurrency = (amount?: number | string) => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) return '₹0';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(amount));
}

export const snakeToTitle = (str: string): string => {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};