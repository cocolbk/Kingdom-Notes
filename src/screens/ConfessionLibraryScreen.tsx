import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTeachings} from '../context/TeachingContext';
import {EmptyState} from '../components/EmptyState';
import {RootStackParamList} from '../navigation/types';
import {formatShortDate} from '../utils/date';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ConfessionLibraryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {confessionEntries} = useTeachings();

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + spacing.md}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📖 Confession Library</Text>
        <Text style={styles.headerSubtitle}>
          {confessionEntries.length} confession
          {confessionEntries.length !== 1 ? 's' : ''} and declarations
        </Text>
      </View>

      <FlatList
        data={confessionEntries}
        keyExtractor={item => item.teachingId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="📖"
            title="No confessions yet"
            message="Add confessions and declarations to your teachings to build your personal library of faith."
          />
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('TeachingDetails', {
                teachingId: item.teachingId,
              })
            }
            activeOpacity={0.85}>
            {item.confession.trim() ? (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Confession</Text>
                <Text style={styles.confessionText}>{item.confession}</Text>
              </View>
            ) : null}
            {item.declaration.trim() ? (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Declaration</Text>
                <Text style={styles.declarationText}>{item.declaration}</Text>
              </View>
            ) : null}
            <View style={styles.meta}>
              <Text style={styles.teachingTitle}>{item.teachingTitle}</Text>
              <Text style={styles.metaDetail}>
                {item.pastorName ? `${item.pastorName} · ` : ''}
                {formatShortDate(item.date)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.sm,
  },
  backText: {
    ...typography.bodySmall,
    color: colors.accentLight,
    fontWeight: '600',
  },
  headerTitle: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    ...typography.bodySmall,
    color: colors.accentLight,
  },
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  confessionText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
  },
  declarationText: {
    ...typography.body,
    color: colors.primary,
    lineHeight: 26,
    fontWeight: '500',
  },
  meta: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  teachingTitle: {
    ...typography.h3,
    fontSize: 14,
    color: colors.primary,
    marginBottom: 2,
  },
  metaDetail: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
