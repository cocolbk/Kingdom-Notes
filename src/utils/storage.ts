import AsyncStorage from '@react-native-async-storage/async-storage';
import {Teaching} from '../types/teaching';

const STORAGE_KEY = '@kingdom_notes_teachings';

export async function loadTeachings(): Promise<Teaching[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveTeachings(teachings: Teaching[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(teachings));
}

export async function clearAllTeachings(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
