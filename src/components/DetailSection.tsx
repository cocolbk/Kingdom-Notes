import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

interface DetailSectionProps {
  label: string;
  content: string;
  icon?: string;
}

export function DetailSection({label, content, icon}: DetailSectionProps) {
  if (!content.trim()) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.primary,
  },
  content: {
    ...typography.body,
    color: colors.text,
    lineHeight: 26,
  },
});
