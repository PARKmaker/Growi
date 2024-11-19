/**
 * Created by tkdgu:박상현 on 2024-11-19
 */

export function formatCurrency(amount: number | null) {
  const value = amount || 0;
  // return new Intl.NumberFormat('ko-KR', {
  //   style: 'currency',
  //   currency: 'KRW',
  //   minimumFractionDigits: 0,
  //   maximumFractionDigits: 0,
  // }).format(value);

  return value.toLocaleString('ko-KR');
}

export function formatDate(date: Date, onlyMonth?: boolean) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  if (!onlyMonth) {
    options.day = 'numeric';
  }

  return new Intl.DateTimeFormat('ko-KR', options).format(date);
}
