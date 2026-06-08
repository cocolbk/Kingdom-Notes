import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {SAMPLE_TEACHINGS} from '../data/sampleTeachings';
import {clearAllTeachings, loadTeachings, saveTeachings} from '../storage/storage';
import {Teaching, TeachingInput} from '../types/teaching';
import {sortByDateDesc} from '../utils/date';
import {generateId} from '../utils/search';

interface TeachingContextValue {
  teachings: Teaching[];
  favoriteTeachings: Teaching[];
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
    let loaded = await loadTeachings();
    if (loaded.length === 0) {
      loaded = SAMPLE_TEACHINGS;
      await saveTeachings(loaded);
    }
    setTeachings(sortByDateDesc(loaded));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTeaching = useCallback(
    async (input: TeachingInput): Promise<Teaching> => {
      const teaching: Teaching = {
        id: generateId(),
        title: input.title.trim(),
        pastorName: input.pastorName.trim(),
        date: input.date,
        scriptureReference: input.scriptureReference.trim(),
        mainTeachingNotes: input.mainTeachingNotes.trim(),
        prayer: input.prayer.trim(),
        confession: input.confession.trim(),
        isFavorite: input.isFavorite ?? false,
        createdAt: Date.now(),
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
          scriptureReference: input.scriptureReference.trim(),
          mainTeachingNotes: input.mainTeachingNotes.trim(),
          prayer: input.prayer.trim(),
          confession: input.confession.trim(),
          isFavorite: input.isFavorite ?? item.isFavorite,
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
        item.id === id ? {...item, isFavorite: !item.isFavorite} : item,
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

  const favoriteTeachings = useMemo(
    () => teachings.filter(item => item.isFavorite),
    [teachings],
  );

  const value = useMemo(
    (): TeachingContextValue => ({
      teachings,
      favoriteTeachings,
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
      favoriteTeachings,
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
