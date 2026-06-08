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

export function PrayerJournalScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {prayerEntries} = useTeachings();

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + spacing.md}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🙏 Prayer Journal</Text>
        <Text style={styles.headerSubtitle}>
          {prayerEntries.length} prayer
          {prayerEntries.length !== 1 ? 's' : ''} collected from your teachings
        </Text>
      </View>

      <FlatList
        data={prayerEntries}
        keyExtractor={item => item.teachingId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="🙏"
            title="No prayers yet"
            message="Add prayers to your teaching notes and they will appear here automatically."
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
            <Text style={styles.prayerText}>{item.prayer}</Text>
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
    borderLeftColor: colors.success,
  },
  prayerText: {
    ...typography.body,
    color: colors.text,
    lineHeight: 26,
    marginBottom: spacing.md,
    fontStyle: 'italic',
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
