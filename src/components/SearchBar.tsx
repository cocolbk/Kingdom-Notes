import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'

interface SearchBarProps {
  value: string
  onChangeText: (text: string) => void
  onClear?: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search teachings..."
        placeholderTextColor="#CCCCCC"
        value={value}
        onChangeText={onChangeText}
      />
      {value && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A1A1A',
  },
  clearButton: {
    marginLeft: 8,
    padding: 6,
  },
  clearText: {
    fontSize: 18,
    color: '#999999',
  },
})