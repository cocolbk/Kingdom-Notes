import React, {useMemo, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTeachings} from '../context/TeachingContext';
import {SearchInput} from '../components/SearchInput';
import {TeachingList} from '../components/TeachingList';
import {RootStackParamList} from '../navigation/types';
import {searchTeachings} from '../utils/search';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SearchScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {teachings, toggleFavorite, deleteTeaching} = useTeachings();
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => searchTeachings(teachings, query),
    [teachings, query],
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Teaching',
      'Are you sure you want to permanently delete this teaching?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTeaching(id),
        },
      ],
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>
          Filter by title, pastor, scripture, or date
        </Text>
        <SearchInput value={query} onChangeText={setQuery} />
      </View>

      <TeachingList
        teachings={results}
        onPress={teaching =>
          navigation.navigate('AddTeaching', {teachingId: teaching.id})
        }
        onToggleFavorite={toggleFavorite}
        onDelete={handleDelete}
        emptyTitle={query.trim() ? 'No results found' : 'Search your teachings'}
        emptyMessage={
          query.trim()
            ? 'Try different keywords or check your spelling.'
            : 'Enter a keyword to find sermon notes quickly.'
        }
        contentPaddingBottom={32}
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
});
