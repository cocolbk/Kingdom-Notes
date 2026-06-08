import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

interface HeroCardProps {
  tagline: string;
  confession?: string;
  confessionSource?: string;
}

export function HeroCard({tagline, confession, confessionSource}: HeroCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.accentLine} />
      <Text style={styles.cross}>✝</Text>
      <Text style={styles.appName}>Kingdom Notes</Text>
      <Text style={styles.tagline}>{tagline}</Text>

      {confession ? (
        <View style={styles.confessionBox}>
          <Text style={styles.confessionLabel}>Daily Confession</Text>
          <Text style={styles.confessionText}>"{confession}"</Text>
          {confessionSource ? (
            <Text style={styles.confessionSource}>— {confessionSource}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  accentLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.accent,
  },
  cross: {
    fontSize: 24,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  appName: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.accentLight,
    marginBottom: spacing.lg,
  },
  confessionBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: radius.md,
    padding: spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  confessionLabel: {
    ...typography.label,
    color: colors.accentLight,
    marginBottom: spacing.sm,
  },
  confessionText: {
    ...typography.body,
    color: colors.white,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  confessionSource: {
    ...typography.caption,
    color: colors.accentLight,
    marginTop: spacing.sm,
    textAlign: 'right',
  },
});
