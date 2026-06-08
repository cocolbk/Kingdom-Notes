import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTeachings} from '../context/TeachingContext';
import {Button} from '../components/Button';
import {getStorageKey} from '../storage/storage';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

const TAGLINE = "Capture • Preserve • Grow Through God's Word";

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const {
    teachings,
    favoriteTeachings,
    prayerEntries,
    confessionEntries,
    clearAllData,
  } = useTeachings();

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all teachings, prayers, and confessions. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear Everything',
          style: 'destructive',
          onPress: async () => {
            await clearAllData();
            Alert.alert('Done', 'All journal data has been cleared.');
          },
        },
      ],
    );
  };

  const stats = [
    {label: 'Total Teachings', value: teachings.length, icon: '📜'},
    {label: 'Favorites', value: favoriteTeachings.length, icon: '★'},
    {label: 'Prayers', value: prayerEntries.length, icon: '🙏'},
    {label: 'Confessions', value: confessionEntries.length, icon: '📖'},
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scroll,
        {paddingTop: insets.top + spacing.lg},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>✝</Text>
        </View>
        <Text style={styles.appName}>Kingdom Notes</Text>
        <Text style={styles.tagline}>{TAGLINE}</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Journal Stats</Text>
      <View style={styles.statsGrid}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.infoCard}>
        <InfoRow label="App Name" value="Kingdom Notes" />
        <InfoRow label="Package" value="com.kingdomnotes.app" />
        <InfoRow label="Version" value="1.0.0" />
        <InfoRow label="Storage" value="Offline (AsyncStorage)" />
        <InfoRow label="Storage Key" value={getStorageKey()} />
      </View>

      <Text style={styles.sectionTitle}>Data Management</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          All your teachings are stored locally on this device. No account or
          internet connection is required. Your spiritual journal stays private
          and accessible anytime.
        </Text>
        <Button
          title="Clear All Data"
          variant="danger"
          onPress={handleClearData}
          style={styles.clearButton}
        />
      </View>

      <Text style={styles.footer}>
        Built with love for God's Word · Kingdom Notes © 2026
      </Text>
    </ScrollView>
  );
}

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  avatarIcon: {
    fontSize: 36,
    color: colors.accent,
  },
  appName: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 28,
  },
  statLabel: {
    ...typography.caption,
    textAlign: 'center',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  infoLabel: {
    ...typography.bodySmall,
    color: colors.textMuted,
    flex: 1,
  },
  infoValue: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  infoText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  clearButton: {
    width: '100%',
  },
  footer: {
    ...typography.caption,
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});
