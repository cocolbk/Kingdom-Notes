import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTeachings} from '../context/TeachingContext';
import {TeachingList} from '../components/TeachingList';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {favoriteTeachings, toggleFavorite, deleteTeaching} = useTeachings();

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
        <Text style={styles.title}>★ Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteTeachings.length} starred teaching
          {favoriteTeachings.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <TeachingList
        teachings={favoriteTeachings}
        onPress={teaching =>
          navigation.navigate('AddTeaching', {teachingId: teaching.id})
        }
        onToggleFavorite={toggleFavorite}
        onDelete={handleDelete}
        emptyTitle="No favorites yet"
        emptyMessage="Tap the star on any teaching card to save it here."
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
  },
});
