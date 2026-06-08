import AsyncStorage from '@react-native-async-storage/async-storage'
import { Teaching } from '../types/teaching'

const TEACHINGS_KEY = '@kingdom_notes_teachings'

export const getTeachings = async (): Promise<Teaching[]> => {
  try {
    const data = await AsyncStorage.getItem(TEACHINGS_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading teachings:', error)
    return []
  }
}

export const saveTeaching = async (teaching: Teaching): Promise<void> => {
  try {
    const teachings = await getTeachings()
    const index = teachings.findIndex((t) => t.id === teaching.id)
    if (index > -1) {
      teachings[index] = teaching
    } else {
      teachings.push(teaching)
    }
    await AsyncStorage.setItem(TEACHINGS_KEY, JSON.stringify(teachings))
  } catch (error) {
    console.error('Error saving teaching:', error)
  }
}

export const deleteTeaching = async (id: string): Promise<void> => {
  try {
    const teachings = await getTeachings()
    const filtered = teachings.filter((t) => t.id !== id)
    await AsyncStorage.setItem(TEACHINGS_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting teaching:', error)
  }
}

export const toggleFavorite = async (id: string): Promise<void> => {
  try {
    const teachings = await getTeachings()
    const teaching = teachings.find((t) => t.id === id)
    if (teaching) {
      teaching.isFavorite = !teaching.isFavorite
      await AsyncStorage.setItem(TEACHINGS_KEY, JSON.stringify(teachings))
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}