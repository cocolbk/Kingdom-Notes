import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTeachings} from '../context/TeachingContext';
import {LoadingScreen} from '../components/LoadingScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {FavoritesScreen} from '../screens/FavoritesScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {AddTeachingScreen} from '../screens/AddTeachingScreen';
import {TeachingDetailsScreen} from '../screens/TeachingDetailsScreen';
import {PrayerJournalScreen} from '../screens/PrayerJournalScreen';
import {ConfessionLibraryScreen} from '../screens/ConfessionLibraryScreen';
import {MainTabParamList, RootStackParamList} from './types';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function TabIcon({label, focused}: {label: string; focused: boolean}) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Search: '🔍',
    Favorites: '★',
    Profile: '👤',
  };
  return (
    <Text style={{fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.7}}>
      {icons[label] ?? '•'}
    </Text>
  );
}

function MainTabs() {
  const {favoriteTeachings} = useTeachings();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: {
          ...typography.caption,
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.borderLight,
          paddingTop: 4,
          height: 62,
        },
        tabBarIcon: ({focused}) => (
          <TabIcon label={route.name} focused={focused} />
        ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarBadge:
            favoriteTeachings.length > 0
              ? favoriteTeachings.length
              : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.accent,
            color: colors.primaryDark,
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const {isLoading} = useTeachings();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: colors.white,
          headerTitleStyle: {...typography.h3, color: colors.white},
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddTeaching"
          component={AddTeachingScreen}
          options={({route}) => ({
            title: route.params?.teachingId ? 'Edit Teaching' : 'Add Teaching',
            presentation: 'modal',
          })}
        />
        <Stack.Screen
          name="TeachingDetails"
          component={TeachingDetailsScreen}
          options={{title: 'Teaching Details'}}
        />
        <Stack.Screen
          name="PrayerJournal"
          component={PrayerJournalScreen}
          options={{title: 'Prayer Journal', headerShown: false}}
        />
        <Stack.Screen
          name="ConfessionLibrary"
          component={ConfessionLibraryScreen}
          options={{title: 'Confession Library', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
