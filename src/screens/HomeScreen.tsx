import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {teachings, toggleFavorite, deleteTeaching} = useTeachings();

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
        <Text style={styles.title}>Biblical Journal</Text>
        <Text style={styles.subtitle}>
          {teachings.length} teaching{teachings.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      <TeachingList
        teachings={teachings}
        onPress={teaching =>
          navigation.navigate('AddTeaching', {teachingId: teaching.id})
        }
        onToggleFavorite={toggleFavorite}
        onDelete={handleDelete}
      />

      <TouchableOpacity
        style={[styles.fab, {bottom: insets.bottom + 16}]}
        onPress={() => navigation.navigate('AddTeaching')}
        activeOpacity={0.9}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
