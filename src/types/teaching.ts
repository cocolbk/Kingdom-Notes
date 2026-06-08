export interface Teaching {
  id: string;
  title: string;
  pastorName: string;
  date: string;
  scriptureReferences: string;
  mainNotes: string;
  prayer: string;
  confession: string;
  declaration: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TeachingInput = Omit<
  Teaching,
  'id' | 'isFavorite' | 'createdAt' | 'updatedAt'
> & {
  isFavorite?: boolean;
};

export interface PrayerEntry {
  teachingId: string;
  teachingTitle: string;
  pastorName: string;
  date: string;
  prayer: string;
}

export interface ConfessionEntry {
  teachingId: string;
  teachingTitle: string;
  pastorName: string;
  date: string;
  confession: string;
  declaration: string;
}
