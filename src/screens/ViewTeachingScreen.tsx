import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Teaching } from '../types/teaching'
import { deleteTeaching, toggleFavorite } from '../utils/storage'

type RootStackParamList = {
  Home: undefined
  ViewTeaching: { teaching: Teaching }
  EditTeaching: { teaching: Teaching }
}

type Props = NativeStackScreenProps<RootStackParamList, 'ViewTeaching'>

export const ViewTeachingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { teaching } = route.params

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleDelete = () => {
    Alert.alert('Delete Teaching', 'Are you sure you want to delete this teaching?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTeaching(teaching.id)
            navigation.goBack()
          } catch (error) {
            console.error('Error deleting teaching:', error)
          }
        },
      },
    ])
  }

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(teaching.id)
      navigation.goBack()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{teaching.title}</Text>
            </View>
            <TouchableOpacity
              onPress={handleToggleFavorite}
              style={styles.favoriteBtn}
            >
              <Text style={styles.favoriteStar}>
                {teaching.isFavorite ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.pastor}>{teaching.pastorName}</Text>
          <Text style={styles.date}>{formatDate(teaching.date)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Scripture Reference</Text>
          <Text style={styles.sectionContent}>{teaching.scriptureReference}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Main Teaching Notes</Text>
          <Text style={styles.sectionContent}>{teaching.mainTeachingNotes}</Text>
        </View>

        {teaching.prayer && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Prayer</Text>
            <Text style={styles.sectionContent}>{teaching.prayer}</Text>
          </View>
        )}

        {teaching.confession && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Confession</Text>
            <Text style={styles.sectionContent}>{teaching.confession}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('EditTeaching', { teaching })}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  favoriteBtn: {
    padding: 4,
  },
  favoriteStar: {
    fontSize: 28,
    color: '#FFB800',
  },
  pastor: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#999999',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#4A90E2',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  spacer: {
    height: 32,
  },
})