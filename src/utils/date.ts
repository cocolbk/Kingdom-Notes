import {Teaching} from '../types/teaching';

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) {
    return '';
  }
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatShortDate(isoDate: string): string {
  if (!isoDate) {
    return '';
  }
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function todayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export function sortByDateDesc(items: Teaching[]): Teaching[] {
  return [...items].sort((a, b) => {
    const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return b.createdAt - a.createdAt;
  });
}
