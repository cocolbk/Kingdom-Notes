import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native'
import { getTeachings } from '../utils/storage'

export const ProfileScreen: React.FC = () => {
  const [stats, setStats] = useState({
    totalTeachings: 0,
    totalFavorites: 0,
    totalPastors: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const teachings = await getTeachings()
      const uniquePastors = new Set(teachings.map((t) => t.pastorName))
      const favorites = teachings.filter((t) => t.isFavorite)

      setStats({
        totalTeachings: teachings.length,
        totalFavorites: favorites.length,
        totalPastors: uniquePastors.size,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>📖</Text>
          </View>
          <Text style={styles.appName}>Kingdom Notes</Text>
          <Text style={styles.subtitle}>Biblical Teaching Journal</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalTeachings}</Text>
            <Text style={styles.statLabel}>Total Teachings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalFavorites}</Text>
            <Text style={styles.statLabel}>Favorite Teachings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats.totalPastors}</Text>
            <Text style={styles.statLabel}>Unique Pastors</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>About Kingdom Notes</Text>
          <Text style={styles.description}>
            Kingdom Notes is a biblical teaching journal app designed to help you save, organize,
            and revisit church teachings, sermon notes, prayers, and confessions.
          </Text>

          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✓ Add and organize teaching notes</Text>
            <Text style={styles.feature}>✓ Search by title, pastor, scripture, or date</Text>
            <Text style={styles.feature}>✓ Mark teachings as favorites</Text>
            <Text style={styles.feature}>✓ Include prayer and confession notes</Text>
            <Text style={styles.feature}>✓ Local storage - your data stays private</Text>
          </View>

          <Text style={styles.sectionTitle}>Version</Text>
          <Text style={styles.version}>1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999999',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
  featureList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  feature: {
    fontSize: 13,
    color: '#666666',
    paddingVertical: 6,
    lineHeight: 20,
  },
  version: {
    fontSize: 14,
    color: '#666666',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
})