import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import DatePicker from 'react-native-date-picker'
import { Teaching } from '../types/teaching'

interface TeachingFormProps {
  initialTeaching?: Teaching
  onSave: (teaching: Partial<Teaching>) => void
  onCancel: () => void
}

export const TeachingForm: React.FC<TeachingFormProps> = ({
  initialTeaching,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState('')
  const [pastorName, setPastorName] = useState('')
  const [scriptureReference, setScriptureReference] = useState('')
  const [mainTeachingNotes, setMainTeachingNotes] = useState('')
  const [prayer, setPrayer] = useState('')
  const [confession, setConfession] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    if (initialTeaching) {
      setTitle(initialTeaching.title)
      setPastorName(initialTeaching.pastorName)
      setScriptureReference(initialTeaching.scriptureReference)
      setMainTeachingNotes(initialTeaching.mainTeachingNotes)
      setPrayer(initialTeaching.prayer)
      setConfession(initialTeaching.confession)
      setDate(new Date(initialTeaching.date))
    }
  }, [initialTeaching])

  const handleSave = () => {
    if (!title.trim() || !pastorName.trim() || !mainTeachingNotes.trim()) {
      Alert.alert('Validation Error', 'Please fill in title, pastor name, and main teaching notes')
      return
    }

    const teaching: Partial<Teaching> = {
      title: title.trim(),
      pastorName: pastorName.trim(),
      scriptureReference: scriptureReference.trim(),
      mainTeachingNotes: mainTeachingNotes.trim(),
      prayer: prayer.trim(),
      confession: confession.trim(),
      date: date.toISOString().split('T')[0],
    }

    onSave(teaching)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Teaching Details</Text>

        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter teaching title"
          placeholderTextColor="#CCCCCC"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Pastor Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pastor's name"
          placeholderTextColor="#CCCCCC"
          value={pastorName}
          onChangeText={setPastorName}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
          />
        )}

        <Text style={styles.label}>Scripture Reference</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., John 3:16, Matthew 5:1-12"
          placeholderTextColor="#CCCCCC"
          value={scriptureReference}
          onChangeText={setScriptureReference}
        />

        <Text style={styles.label}>Main Teaching Notes *</Text>
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Enter the main teaching notes"
          placeholderTextColor="#CCCCCC"
          value={mainTeachingNotes}
          onChangeText={setMainTeachingNotes}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Prayer</Text>
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Enter prayer notes"
          placeholderTextColor="#CCCCCC"
          value={prayer}
          onChangeText={setPrayer}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Confession</Text>
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Enter confession notes"
          placeholderTextColor="#CCCCCC"
          value={confession}
          onChangeText={setConfession}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
  },
  largeInput: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  dateButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#EEEEEE',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})