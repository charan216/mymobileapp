export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

export const formatCurrency = (amount: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', {style: 'currency', currency}).format(amount);

export const truncateText = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
