import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Teaching } from './types/teaching'

// Screens
import { HomeScreen } from './screens/HomeScreen'
import { SearchScreen } from './screens/SearchScreen'
import { FavoritesScreen } from './screens/FavoritesScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { AddTeachingScreen } from './screens/AddTeachingScreen'
import { EditTeachingScreen } from './screens/EditTeachingScreen'
import { ViewTeachingScreen } from './screens/ViewTeachingScreen'

type RootStackParamList = {
  HomeTabs: undefined
  AddTeaching: undefined
  EditTeaching: { teaching: Teaching }
  ViewTeaching: { teaching: Teaching }
}

type HomeTabsParamList = {
  HomeStack: undefined
  SearchStack: undefined
  FavoritesStack: undefined
  ProfileStack: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<HomeTabsParamList>()
const HomeStack = createNativeStackNavigator()
const SearchStack = createNativeStackNavigator()
const FavoritesStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ViewTeaching" component={ViewTeachingScreen} />
    </HomeStack.Navigator>
  )
}

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
      <SearchStack.Screen name="ViewTeaching" component={ViewTeachingScreen} />
    </SearchStack.Navigator>
  )
}

const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <FavoritesStack.Screen name="FavoritesScreen" component={FavoritesScreen} />
      <FavoritesStack.Screen name="ViewTeaching" component={ViewTeachingScreen} />
    </FavoritesStack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
}

const HomeTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📖</Text>,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🔍</Text>,
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStackNavigator}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⭐</Text>,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen name="HomeTabs" component={HomeTabsNavigator} />
          <Stack.Screen
            name="AddTeaching"
            component={AddTeachingScreen}
            options={{
              headerShown: true,
              headerTitle: 'Add Teaching',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="EditTeaching"
            component={EditTeachingScreen}
            options={{
              headerShown: true,
              headerTitle: 'Edit Teaching',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="ViewTeaching"
            component={ViewTeachingScreen}
            options={{
              headerShown: true,
              headerTitle: 'Teaching',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App

import { Text } from 'react-native'