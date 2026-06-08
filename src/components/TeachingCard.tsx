import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Teaching} from '../types/teaching';
import {formatShortDate} from '../utils/date';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

interface TeachingCardProps {
  teaching: Teaching;
  onPress: () => void;
  onToggleFavorite?: () => void;
  onLongPress?: () => void;
}

export function TeachingCard({
  teaching,
  onPress,
  onToggleFavorite,
  onLongPress,
}: TeachingCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={2}>
            {teaching.title || 'Untitled Teaching'}
          </Text>
          {teaching.pastorName ? (
            <Text style={styles.pastor} numberOfLines={1}>
              {teaching.pastorName}
            </Text>
          ) : null}
        </View>
        {onToggleFavorite ? (
          <TouchableOpacity
            onPress={onToggleFavorite}
            hitSlop={12}
            style={styles.favoriteButton}>
            <Text style={styles.favoriteIcon}>
              {teaching.isFavorite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.meta}>
        <Text style={styles.date}>{formatShortDate(teaching.date)}</Text>
        {teaching.scriptureReference ? (
          <Text style={styles.scripture} numberOfLines={1}>
            📖 {teaching.scriptureReference}
          </Text>
        ) : null}
      </View>

      {teaching.mainTeachingNotes ? (
        <Text style={styles.preview} numberOfLines={2}>
          {teaching.mainTeachingNotes}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  headerText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: 2,
  },
  pastor: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
  favoriteIcon: {
    fontSize: 24,
    color: colors.favorite,
  },
  meta: {
    marginBottom: spacing.sm,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 2,
  },
  scripture: {
    ...typography.bodySmall,
    color: colors.primaryLight,
    fontStyle: 'italic',
  },
  preview: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
