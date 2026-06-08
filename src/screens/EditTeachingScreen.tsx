import React from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TeachingForm } from '../components/TeachingForm'
import { saveTeaching } from '../utils/storage'
import { Teaching } from '../types/teaching'

type RootStackParamList = {
  Home: undefined
  AddTeaching: undefined
  EditTeaching: { teaching: Teaching }
  ViewTeaching: { teaching: Teaching }
}

type Props = NativeStackScreenProps<RootStackParamList, 'EditTeaching'>

export const EditTeachingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { teaching } = route.params

  const handleSave = async (data: Partial<Teaching>) => {
    try {
      const updatedTeaching: Teaching = {
        ...teaching,
        ...data,
      }

      await saveTeaching(updatedTeaching)
      navigation.goBack()
    } catch (error) {
      console.error('Error updating teaching:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TeachingForm
        initialTeaching={teaching}
        onSave={handleSave}
        onCancel={() => navigation.goBack()}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
})