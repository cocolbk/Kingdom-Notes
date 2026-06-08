import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.cross}>✝</Text>
      <Text style={styles.title}>Kingdom Notes</Text>
      <ActivityIndicator
        size="large"
        color={colors.accent}
        style={styles.spinner}
      />
      <Text style={styles.subtitle}>Loading your journal...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xxxl,
  },
  cross: {
    fontSize: 36,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xl,
  },
  spinner: {
    marginBottom: spacing.lg,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});
