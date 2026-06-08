import React, {useMemo, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTeachings} from '../context/TeachingContext';
import {SearchInput} from '../components/SearchInput';
import {TeachingCard} from '../components/TeachingCard';
import {EmptyState} from '../components/EmptyState';
import {RootStackParamList} from '../navigation/types';
import {searchTeachings} from '../utils/search';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {teachings, toggleFavorite} = useTeachings();
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => searchTeachings(teachings, query),
    [teachings, query],
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>
          Find teachings by title, pastor, scripture, or notes
        </Text>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          autoFocus={false}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={query.trim() ? '🔍' : '📚'}
            title={query.trim() ? 'No results found' : 'Search your teachings'}
            message={
              query.trim()
                ? 'Try different keywords or check your spelling.'
                : 'Enter a keyword to search across all your sermon notes.'
            }
          />
        }
        renderItem={({item}) => (
          <TeachingCard
            teaching={item}
            onPress={() =>
              navigation.navigate('TeachingDetails', {teachingId: item.id})
            }
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
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
    marginBottom: spacing.lg,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
});
