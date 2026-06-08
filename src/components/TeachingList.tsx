import React from 'react'
import {
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Teaching } from '../types/teaching'
import { TeachingCard } from './TeachingCard'

interface TeachingListProps {
  teachings: Teaching[]
  onSelectTeaching: (teaching: Teaching) => void
  onEditTeaching: (teaching: Teaching) => void
  onDeleteTeaching: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export const TeachingList: React.FC<TeachingListProps> = ({
  teachings,
  onSelectTeaching,
  onEditTeaching,
  onDeleteTeaching,
  onToggleFavorite,
}) => {
  if (!teachings || teachings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No teachings yet</Text>
        <Text style={styles.emptySubtext}>Tap the + button to add your first teaching</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={teachings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TeachingCard
          teaching={item}
          onPress={() => onSelectTeaching(item)}
          onEdit={() => onEditTeaching(item)}
          onDelete={() => onDeleteTeaching(item.id)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
        />
      )}
      contentContainerStyle={styles.listContent}
      scrollEnabled={true}
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
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