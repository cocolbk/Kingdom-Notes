import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {clearAllTeachings, loadTeachings, saveTeachings} from '../storage/storage';
import {
  ConfessionEntry,
  PrayerEntry,
  Teaching,
  TeachingInput,
} from '../types/teaching';
import {sortByDateDesc} from '../utils/date';
import {generateId} from '../utils/search';

interface TeachingContextValue {
  teachings: Teaching[];
  recentTeachings: Teaching[];
  favoriteTeachings: Teaching[];
  prayerEntries: PrayerEntry[];
  confessionEntries: ConfessionEntry[];
  isLoading: boolean;
  addTeaching: (input: TeachingInput) => Promise<Teaching>;
  updateTeaching: (id: string, input: TeachingInput) => Promise<void>;
  deleteTeaching: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  getTeachingById: (id: string) => Teaching | undefined;
  clearAllData: () => Promise<void>;
  refresh: () => Promise<void>;
}

const TeachingContext = createContext<TeachingContextValue | null>(null);

export function TeachingProvider({children}: {children: React.ReactNode}) {
  const [teachings, setTeachings] = useState<Teaching[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const persist = useCallback(async (next: Teaching[]) => {
    const sorted = sortByDateDesc(next);
    setTeachings(sorted);
    await saveTeachings(sorted);
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const loaded = await loadTeachings();
    setTeachings(sortByDateDesc(loaded));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTeaching = useCallback(
    async (input: TeachingInput): Promise<Teaching> => {
      const now = new Date().toISOString();
      const teaching: Teaching = {
        id: generateId(),
        title: input.title.trim(),
        pastorName: input.pastorName.trim(),
        date: input.date,
        scriptureReferences: input.scriptureReferences.trim(),
        mainNotes: input.mainNotes.trim(),
        prayer: input.prayer.trim(),
        confession: input.confession.trim(),
        declaration: input.declaration.trim(),
        isFavorite: input.isFavorite ?? false,
        createdAt: now,
        updatedAt: now,
      };
      await persist([teaching, ...teachings]);
      return teaching;
    },
    [persist, teachings],
  );

  const updateTeaching = useCallback(
    async (id: string, input: TeachingInput) => {
      const next = teachings.map(item => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          title: input.title.trim(),
          pastorName: input.pastorName.trim(),
          date: input.date,
          scriptureReferences: input.scriptureReferences.trim(),
          mainNotes: input.mainNotes.trim(),
          prayer: input.prayer.trim(),
          confession: input.confession.trim(),
          declaration: input.declaration.trim(),
          isFavorite: input.isFavorite ?? item.isFavorite,
          updatedAt: new Date().toISOString(),
        };
      });
      await persist(next);
    },
    [persist, teachings],
  );

  const deleteTeaching = useCallback(
    async (id: string) => {
      await persist(teachings.filter(item => item.id !== id));
    },
    [persist, teachings],
  );

  const toggleFavorite = useCallback(
    async (id: string) => {
      const next = teachings.map(item =>
        item.id === id
          ? {...item, isFavorite: !item.isFavorite, updatedAt: new Date().toISOString()}
          : item,
      );
      await persist(next);
    },
    [persist, teachings],
  );

  const getTeachingById = useCallback(
    (id: string) => teachings.find(item => item.id === id),
    [teachings],
  );

  const clearAllData = useCallback(async () => {
    await clearAllTeachings();
    setTeachings([]);
  }, []);

  const recentTeachings = useMemo(
    () => teachings.slice(0, 5),
    [teachings],
  );

  const favoriteTeachings = useMemo(
    () => teachings.filter(item => item.isFavorite),
    [teachings],
  );

  const prayerEntries = useMemo(
    (): PrayerEntry[] =>
      teachings
        .filter(item => item.prayer.trim().length > 0)
        .map(item => ({
          teachingId: item.id,
          teachingTitle: item.title,
          pastorName: item.pastorName,
          date: item.date,
          prayer: item.prayer,
        })),
    [teachings],
  );

  const confessionEntries = useMemo(
    (): ConfessionEntry[] =>
      teachings
        .filter(
          item =>
            item.confession.trim().length > 0 ||
            item.declaration.trim().length > 0,
        )
        .map(item => ({
          teachingId: item.id,
          teachingTitle: item.title,
          pastorName: item.pastorName,
          date: item.date,
          confession: item.confession,
          declaration: item.declaration,
        })),
    [teachings],
  );

  const value = useMemo(
    (): TeachingContextValue => ({
      teachings,
      recentTeachings,
      favoriteTeachings,
      prayerEntries,
      confessionEntries,
      isLoading,
      addTeaching,
      updateTeaching,
      deleteTeaching,
      toggleFavorite,
      getTeachingById,
      clearAllData,
      refresh,
    }),
    [
      teachings,
      recentTeachings,
      favoriteTeachings,
      prayerEntries,
      confessionEntries,
      isLoading,
      addTeaching,
      updateTeaching,
      deleteTeaching,
      toggleFavorite,
      getTeachingById,
      clearAllData,
      refresh,
    ],
  );

  return (
    <TeachingContext.Provider value={value}>{children}</TeachingContext.Provider>
  );
}

export function useTeachings(): TeachingContextValue {
  const context = useContext(TeachingContext);
  if (!context) {
    throw new Error('useTeachings must be used within TeachingProvider');
  }
  return context;
}
