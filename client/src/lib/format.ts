/**
 * Created by tkdgu:박상현 on 2024-11-19
 */

export function formatKoreanWon(amount: number | null): string {
  const value = amount || 0;
  if (value >= 1e12) {
    // 조
    if (value % 1e12 === 0) {
      return `${value / 1e12}조`;
    }
    return `${Math.trunc(value / 1e12)}조 ${Math.trunc((value % 1e12) / 1e8)}억`;
  } else if (value >= 1e8) {
    // 억
    if (value % 1e8 === 0) {
      return `${value / 1e8}억`;
    }
    return `${Math.trunc(value / 1e8)}억 ${Math.trunc((value % 1e8) / 10000)}만`;
  } else if (value >= 1_000_000) {
    // 만
    return `${Math.trunc(value / 10000)}만`;
  } else {
    // 기본
    return `${value.toLocaleString()}`;
  }
}

export function formatCurrency(amount: number | null) {
  const value = amount || 0;
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
