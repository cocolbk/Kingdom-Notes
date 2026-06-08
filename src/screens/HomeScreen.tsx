import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TeachingList } from '../components/TeachingList'
import { Teaching } from '../types/teaching'
import { getTeachings, deleteTeaching, toggleFavorite, saveTeaching } from '../utils/storage'
import { SAMPLE_TEACHINGS } from '../utils/sampleData'

type RootStackParamList = {
  Home: undefined
  AddTeaching: undefined
  EditTeaching: { teaching: Teaching }
  ViewTeaching: { teaching: Teaching }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [teachings, setTeachings] = useState<Teaching[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeachings()
  }, [])

  const loadTeachings = async () => {
    try {
      let data = await getTeachings()
      if (data.length === 0) {
        // Add sample data on first load
        for (const teaching of SAMPLE_TEACHINGS) {
          await saveTeaching(teaching)
        }
        data = SAMPLE_TEACHINGS
      }
      setTeachings(data.sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
      console.error('Error loading teachings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeaching = async (id: string) => {
    try {
      await deleteTeaching(id)
      await loadTeachings()
    } catch (error) {
      console.error('Error deleting teaching:', error)
    }
  }

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id)
      await loadTeachings()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const useFocusEffect = () => {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadTeachings()
      })
      return unsubscribe
    }, [navigation])
  }

  useFocusEffect()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kingdom Notes</Text>
      </View>

      <TeachingList
        teachings={teachings}
        onSelectTeaching={(teaching) =>
          navigation.navigate('ViewTeaching', { teaching })
        }
        onEditTeaching={(teaching) =>
          navigation.navigate('EditTeaching', { teaching })
        }
        onDeleteTeaching={handleDeleteTeaching}
        onToggleFavorite={handleToggleFavorite}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTeaching')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '600',
  },
})