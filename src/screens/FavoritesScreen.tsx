import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TeachingList } from '../components/TeachingList'
import { Teaching } from '../types/teaching'
import { getTeachings, deleteTeaching, toggleFavorite } from '../utils/storage'

type RootStackParamList = {
  Home: undefined
  Favorites: undefined
  EditTeaching: { teaching: Teaching }
  ViewTeaching: { teaching: Teaching }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Favorites'>

export const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Teaching[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const data = await getTeachings()
      const favs = data.filter((teaching) => teaching.isFavorite)
      setFavorites(favs.sort((a, b) => b.createdAt - a.createdAt))
    } catch (error) {
      console.error('Error loading favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeaching = async (id: string) => {
    try {
      await deleteTeaching(id)
      await loadFavorites()
    } catch (error) {
      console.error('Error deleting teaching:', error)
    }
  }

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id)
      await loadFavorites()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const useFocusEffect = () => {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        loadFavorites()
      })
      return unsubscribe
    }, [navigation])
  }

  useFocusEffect()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorite Teachings</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite teachings yet</Text>
          <Text style={styles.emptySubtext}>
            Star teachings to add them to your favorites
          </Text>
        </View>
      ) : (
        <TeachingList
          teachings={favorites}
          onSelectTeaching={(teaching) =>
            navigation.navigate('ViewTeaching', { teaching })
          }
          onEditTeaching={(teaching) =>
            navigation.navigate('EditTeaching', { teaching })
          }
          onDeleteTeaching={handleDeleteTeaching}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
})