import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  AddTeaching: {teachingId?: string} | undefined;
  TeachingDetails: {teachingId: string};
  PrayerJournal: undefined;
  ConfessionLibrary: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  PrayerJournal: undefined;
  ConfessionLibrary: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
