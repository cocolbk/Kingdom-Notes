import {Teaching} from '../types/teaching';

const SEARCH_FIELDS: (keyof Teaching)[] = [
  'title',
  'pastorName',
  'date',
  'scriptureReferences',
  'mainNotes',
  'prayer',
  'confession',
  'declaration',
];

export function searchTeachings(
  teachings: Teaching[],
  query: string,
): Teaching[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return teachings;
  }

  return teachings.filter(teaching =>
    SEARCH_FIELDS.some(field => {
      const value = teaching[field];
      return (
        typeof value === 'string' && value.toLowerCase().includes(trimmed)
      );
    }),
  );
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
