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
  compact?: boolean;
}

export function TeachingCard({
  teaching,
  onPress,
  onToggleFavorite,
  compact,
}: TeachingCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compact]}
      onPress={onPress}
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
        ) : teaching.isFavorite ? (
          <Text style={styles.favoriteIcon}>★</Text>
        ) : null}
      </View>

      <View style={styles.meta}>
        <Text style={styles.date}>{formatShortDate(teaching.date)}</Text>
        {teaching.scriptureReferences ? (
          <Text style={styles.scripture} numberOfLines={1}>
            📖 {teaching.scriptureReferences}
          </Text>
        ) : null}
      </View>

      {!compact && teaching.mainNotes ? (
        <Text style={styles.preview} numberOfLines={2}>
          {teaching.mainNotes}
        </Text>
      ) : null}

      <View style={styles.tags}>
        {teaching.prayer.trim() ? (
          <View style={[styles.tag, styles.prayerTag]}>
            <Text style={styles.tagText}>Prayer</Text>
          </View>
        ) : null}
        {teaching.confession.trim() ? (
          <View style={[styles.tag, styles.confessionTag]}>
            <Text style={styles.tagText}>Confession</Text>
          </View>
        ) : null}
        {teaching.declaration.trim() ? (
          <View style={[styles.tag, styles.declarationTag]}>
            <Text style={styles.tagText}>Declaration</Text>
          </View>
        ) : null}
      </View>
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  compact: {
    padding: spacing.md,
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
    fontSize: 22,
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
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  prayerTag: {
    backgroundColor: colors.successBg,
  },
  confessionTag: {
    backgroundColor: '#F5F0E6',
  },
  declarationTag: {
    backgroundColor: '#EEF2F7',
  },
  tagText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
});
