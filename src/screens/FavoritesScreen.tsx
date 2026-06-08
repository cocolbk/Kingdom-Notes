import React from 'react';
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
import {TeachingCard} from '../components/TeachingCard';
import {EmptyState} from '../components/EmptyState';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {favoriteTeachings, toggleFavorite} = useTeachings();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.title}>★ Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteTeachings.length} starred teaching
          {favoriteTeachings.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={favoriteTeachings}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="★"
            title="No favorites yet"
            message="Star teachings you want to revisit quickly. Tap the star on any teaching card."
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
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
});
