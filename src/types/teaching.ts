export type Teaching = {
  id: string;
  title: string;
  pastorName: string;
  date: string;
  scriptureReference: string;
  mainTeachingNotes: string;
  prayer: string;
  confession: string;
  isFavorite: boolean;
  createdAt: number;
};

export type TeachingInput = Omit<Teaching, 'id' | 'isFavorite' | 'createdAt'> & {
  isFavorite?: boolean;
};
