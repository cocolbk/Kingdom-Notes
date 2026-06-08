import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTeachings} from '../context/TeachingContext';
import {DetailSection} from '../components/DetailSection';
import {Button} from '../components/Button';
import {RootStackParamList} from '../navigation/types';
import {formatDisplayDate} from '../utils/date';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TeachingDetails'
>;
type RouteProps = RouteProp<RootStackParamList, 'TeachingDetails'>;

export function TeachingDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {getTeachingById, toggleFavorite, deleteTeaching} = useTeachings();
  const teaching = getTeachingById(route.params.teachingId);

  if (!teaching) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Teaching not found.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Teaching',
      'Are you sure you want to permanently delete this teaching?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteTeaching(teaching.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>{teaching.title}</Text>
          <TouchableOpacity
            onPress={() => toggleFavorite(teaching.id)}
            hitSlop={12}>
            <Text style={styles.favoriteIcon}>
              {teaching.isFavorite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        {teaching.pastorName ? (
          <Text style={styles.pastor}>{teaching.pastorName}</Text>
        ) : null}
        <Text style={styles.date}>{formatDisplayDate(teaching.date)}</Text>

        {teaching.scriptureReferences ? (
          <View style={styles.scriptureBox}>
            <Text style={styles.scriptureLabel}>Scripture</Text>
            <Text style={styles.scriptureText}>
              {teaching.scriptureReferences}
            </Text>
          </View>
        ) : null}
      </View>

      <DetailSection
        label="Main Teaching Notes"
        content={teaching.mainNotes}
        icon="📝"
      />
      <DetailSection label="Prayer" content={teaching.prayer} icon="🙏" />
      <DetailSection
        label="Confession"
        content={teaching.confession}
        icon="💬"
      />
      <DetailSection
        label="Declaration"
        content={teaching.declaration}
        icon="📣"
      />

      <View style={styles.actions}>
        <Button
          title="Edit Teaching"
          onPress={() =>
            navigation.navigate('AddTeaching', {teachingId: teaching.id})
          }
          style={styles.actionButton}
        />
        <Button
          title="Delete Teaching"
          variant="danger"
          onPress={handleDelete}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
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
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  notFoundText: {
    ...typography.body,
    marginBottom: spacing.lg,
    color: colors.textMuted,
  },
  header: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    flex: 1,
    color: colors.primary,
    marginRight: spacing.md,
  },
  favoriteIcon: {
    fontSize: 28,
    color: colors.favorite,
  },
  pastor: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  scriptureBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  scriptureLabel: {
    ...typography.label,
    color: colors.primaryLight,
    marginBottom: spacing.xs,
  },
  scriptureText: {
    ...typography.body,
    color: colors.primary,
    fontStyle: 'italic',
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});
