import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TeachingCard} from '../components/TeachingCard';
import {RootStackParamList} from '../navigation/types';
import {Teaching} from '../types/teaching';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SAMPLE_TEACHINGS: Teaching[] = [
  {
    id: 'sample-1',
    title: 'Walking in Faith',
    pastorName: 'Pastor David Mensah',
    date: '2026-06-01',
    scriptureReference: 'Hebrews 11:1, Romans 10:17',
    mainTeachingNotes:
      'Faith is the substance of things hoped for. We must guard what we hear, speak faith-filled words, and act on the Word daily.',
    prayer:
      'Lord, increase my faith. Help me to trust You in every season and walk boldly in Your promises.',
    confession:
      'I walk by faith and not by sight. My faith grows stronger every day through the Word of God.',
    isFavorite: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'sample-2',
    title: 'The Power of Prayer',
    pastorName: 'Pastor Grace Adjei',
    date: '2026-05-25',
    scriptureReference: 'James 5:16, Matthew 6:6',
    mainTeachingNotes:
      'Prayer is communion with God, not a religious ritual. The effectual fervent prayer of the righteous availeth much.',
    prayer:
      'Father, teach me to pray with faith and persistence. Let my prayer life draw me closer to You.',
    confession:
      'My prayers are powerful and effective. God hears me when I pray according to His will.',
    isFavorite: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: 'sample-3',
    title: 'Living in Victory',
    pastorName: 'Pastor Samuel Osei',
    date: '2026-05-18',
    scriptureReference: '1 Corinthians 15:57, Romans 8:37',
    mainTeachingNotes:
      'Victory is not something we pursue — it is something we receive through Christ. We are more than conquerors.',
    prayer:
      'Thank You Jesus for the victory. I receive grace to live as an overcomer in every situation.',
    confession:
      'I am victorious through Christ Jesus. No weapon formed against me shall prosper.',
    isFavorite: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
  },
];

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const handleDelete = (id: string) => {
    Alert.alert('Delete Teaching', 'Remove this teaching?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive'},
    ]);
  };

  const teachings = SAMPLE_TEACHINGS;

  return (
    <>
      {console.log('Teachings data:', teachings)}
      <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Biblical Journal</Text>
        <Text style={styles.subtitle}>
          {SAMPLE_TEACHINGS.length} teachings saved
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {SAMPLE_TEACHINGS.map(teaching => (
          <TeachingCard
            key={teaching.id}
            teaching={teaching}
            onPress={() =>
              navigation.navigate('AddTeaching', {teachingId: teaching.id})
            }
            onToggleFavorite={() => {}}
            onLongPress={() => handleDelete(teaching.id)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, {bottom: insets.bottom + 16}]}
        onPress={() => navigation.navigate('AddTeaching')}
        activeOpacity={0.9}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 30,
    color: colors.primaryDark,
    fontWeight: '300',
    marginTop: -2,
  },
});
