import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {borderRadius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

interface DailyConfessionCardProps {
  confession: string;
  source: string;
}

export function DailyConfessionCard({
  confession,
  source,
}: DailyConfessionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.badgeRow}>
        <Text style={styles.badge}>Daily Confession</Text>
        <Text style={styles.cross}>✝</Text>
      </View>
      <Text style={styles.confession}>"{confession}"</Text>
      <Text style={styles.source}>From: {source}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  badge: {
    ...typography.caption,
    color: colors.accentLight,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cross: {
    fontSize: 18,
    color: colors.accent,
  },
  confession: {
    ...typography.body,
    color: colors.textOnPrimary,
    fontStyle: 'italic',
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  source: {
    ...typography.caption,
    color: colors.accentLight,
  },
});
