import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import { Teaching } from '../types/teaching'

interface TeachingCardProps {
  teaching: Teaching
  onPress: () => void
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
}

export const TeachingCard: React.FC<TeachingCardProps> = ({
  teaching,
  onPress,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const handleDelete = () => {
    Alert.alert('Delete Teaching', 'Are you sure you want to delete this teaching?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ])
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {teaching.title}
          </Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteBtn}>
          <Text style={styles.favoriteStar}>{teaching.isFavorite ? '★' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.pastor}>{teaching.pastorName}</Text>

      <View style={styles.metaContainer}>
        <Text style={styles.meta}>{formatDate(teaching.date)}</Text>
        <Text style={styles.meta}>•</Text>
        <Text style={styles.meta} numberOfLines={1}>
          {teaching.scriptureReference}
        </Text>
      </View>

      <Text style={styles.notes} numberOfLines={3}>
        {teaching.mainTeachingNotes}
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  favoriteBtn: {
    padding: 4,
  },
  favoriteStar: {
    fontSize: 24,
    color: '#FFB800',
  },
  pastor: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: '#999999',
  },
  notes: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#E74C3C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
})