import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Teaching} from '../types/teaching';
import {TeachingCard} from './TeachingCard';
import {EmptyState} from './EmptyState';
import {spacing} from '../theme/spacing';

interface TeachingListProps {
  teachings: Teaching[];
  onPress: (teaching: Teaching) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  emptyTitle?: string;
  emptyMessage?: string;
  contentPaddingBottom?: number;
}

export function TeachingList({
  teachings,
  onPress,
  onToggleFavorite,
  onDelete,
  emptyTitle = 'No teachings yet',
  emptyMessage = 'Tap the + button to add your first sermon note.',
  contentPaddingBottom = 100,
}: TeachingListProps) {
  return (
    <FlatList
      data={teachings}
      keyExtractor={item => item.id}
      contentContainerStyle={[
        styles.list,
        {paddingBottom: contentPaddingBottom},
        teachings.length === 0 && styles.emptyList,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <EmptyState icon="📜" title={emptyTitle} message={emptyMessage} />
      }
      renderItem={({item}) => (
        <TeachingCard
          teaching={item}
          onPress={() => onPress(item)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
          onLongPress={() => onDelete(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    flexGrow: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
});
