import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchBar } from '../components/SearchBar'
import { TeachingList } from '../components/TeachingList'
import { Teaching } from '../types/teaching'
import { getTeachings, deleteTeaching, toggleFavorite } from '../utils/storage'

type RootStackParamList = {
  Home: undefined
  Search: undefined
  EditTeaching: { teaching: Teaching }
  ViewTeaching: { teaching: Teaching }
}

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [allTeachings, setAllTeachings] = useState<Teaching[]>([])
  const [searchResults, setSearchResults] = useState<Teaching[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadTeachings()
  }, [])

  const loadTeachings = async () => {
    try {
      const data = await getTeachings()
      setAllTeachings(data)
      setSearchResults(data)
    } catch (error) {
      console.error('Error loading teachings:', error)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults(allTeachings)
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = allTeachings.filter(
      (teaching) =>
        teaching.title.toLowerCase().includes(lowerQuery) ||
        teaching.pastorName.toLowerCase().includes(lowerQuery) ||
        teaching.scriptureReference.toLowerCase().includes(lowerQuery) ||
        teaching.date.includes(query) ||
        teaching.mainTeachingNotes.toLowerCase().includes(lowerQuery)
    )
    setSearchResults(filtered)
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
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={() => handleSearch('')}
      />

      <TeachingList
        teachings={searchResults}
        onSelectTeaching={(teaching) =>
          navigation.navigate('ViewTeaching', { teaching })
        }
        onEditTeaching={(teaching) =>
          navigation.navigate('EditTeaching', { teaching })
        }
        onDeleteTeaching={handleDeleteTeaching}
        onToggleFavorite={handleToggleFavorite}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
})