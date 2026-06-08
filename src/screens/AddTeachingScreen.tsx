import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTeachings} from '../context/TeachingContext';
import {FormField} from '../components/FormField';
import {Button} from '../components/Button';
import {RootStackParamList} from '../navigation/types';
import {TeachingInput} from '../types/teaching';
import {todayISO} from '../utils/date';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTeaching'>;
type RouteProps = RouteProp<RootStackParamList, 'AddTeaching'>;

const emptyForm = (): TeachingInput => ({
  title: '',
  pastorName: '',
  date: todayISO(),
  scriptureReferences: '',
  mainNotes: '',
  prayer: '',
  confession: '',
  declaration: '',
  isFavorite: false,
});

export function AddTeachingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {addTeaching, updateTeaching, getTeachingById} = useTeachings();
  const teachingId = route.params?.teachingId;
  const isEditing = Boolean(teachingId);

  const [form, setForm] = useState<TeachingInput>(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (teachingId) {
      const existing = getTeachingById(teachingId);
      if (existing) {
        setForm({
          title: existing.title,
          pastorName: existing.pastorName,
          date: existing.date,
          scriptureReferences: existing.scriptureReferences,
          mainNotes: existing.mainNotes,
          prayer: existing.prayer,
          confession: existing.confession,
          declaration: existing.declaration,
          isFavorite: existing.isFavorite,
        });
      }
    }
  }, [teachingId, getTeachingById]);

  const updateField = <K extends keyof TeachingInput>(
    key: K,
    value: TeachingInput[K],
  ) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      Alert.alert('Required Field', 'Please enter a teaching title.');
      return;
    }

    setSaving(true);
    try {
      if (isEditing && teachingId) {
        await updateTeaching(teachingId, form);
        navigation.goBack();
      } else {
        const created = await addTeaching(form);
        navigation.replace('TeachingDetails', {teachingId: created.id});
      }
    } catch {
      Alert.alert('Error', 'Could not save teaching. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>
          Record the Word received — every detail helps you grow in faith.
        </Text>

        <FormField
          label="Title"
          required
          value={form.title}
          onChangeText={text => updateField('title', text)}
          placeholder="Sermon or teaching title"
        />
        <FormField
          label="Pastor Name"
          value={form.pastorName}
          onChangeText={text => updateField('pastorName', text)}
          placeholder="Who preached this message?"
        />
        <FormField
          label="Date"
          value={form.date}
          onChangeText={text => updateField('date', text)}
          placeholder="YYYY-MM-DD"
        />
        <FormField
          label="Scripture References"
          value={form.scriptureReferences}
          onChangeText={text => updateField('scriptureReferences', text)}
          placeholder="e.g. John 3:16, Romans 8:28"
        />
        <FormField
          label="Main Teaching Notes"
          multiline
          value={form.mainNotes}
          onChangeText={text => updateField('mainNotes', text)}
          placeholder="Key points, insights, and revelations..."
        />
        <FormField
          label="Prayer"
          multiline
          value={form.prayer}
          onChangeText={text => updateField('prayer', text)}
          placeholder="Personal or altar prayers from this teaching..."
        />
        <FormField
          label="Confession"
          multiline
          value={form.confession}
          onChangeText={text => updateField('confession', text)}
          placeholder="Faith confessions to declare..."
        />
        <FormField
          label="Declaration"
          multiline
          value={form.declaration}
          onChangeText={text => updateField('declaration', text)}
          placeholder="Prophetic declarations..."
        />

        <View style={styles.favoriteRow}>
          <View>
            <Text style={styles.favoriteLabel}>Mark as Favorite</Text>
            <Text style={styles.favoriteHint}>Quick access from Favorites tab</Text>
          </View>
          <Switch
            value={form.isFavorite ?? false}
            onValueChange={value => updateField('isFavorite', value)}
            trackColor={{false: colors.border, true: colors.accentLight}}
            thumbColor={form.isFavorite ? colors.accent : colors.surface}
          />
        </View>

        <Button
          title={isEditing ? 'Save Changes' : 'Save Teaching'}
          onPress={handleSave}
          disabled={saving}
          style={styles.saveButton}
        />
        <Button
          title="Cancel"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  intro: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    fontStyle: 'italic',
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  favoriteLabel: {
    ...typography.h3,
    fontSize: 15,
  },
  favoriteHint: {
    ...typography.caption,
    marginTop: 2,
  },
  saveButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    marginBottom: spacing.lg,
  },
});
