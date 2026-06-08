# Biblical Journal

A React Native + Capacitor mobile app for saving church teachings, sermon notes, prayers, and confessions.

**Repository:** [github.com/cocolbk/Kingdom-Notes](https://github.com/cocolbk/Kingdom-Notes)

## Features

- Add, edit, and delete teaching notes
- Mark teachings as favorites
- Search by title, pastor, scripture reference, or date
- Offline AsyncStorage — no backend required
- 3 sample teachings on first launch

## Tech Stack

- React Native UI (react-native-web for Capacitor bundle)
- Capacitor 6 for Android APK
- React Navigation
- AsyncStorage

## Getting Started

```bash
npm install
```

### Run on Android (Capacitor)

```bash
npm run cap:run:android
```

### Build Release APK

```bash
npm run build:android
```

APK output: `android-cap/app/build/outputs/apk/release/app-release-unsigned.apk`

### Android SDK

Copy `android-cap/local.properties.template` to `android-cap/local.properties` and set your SDK path.

## App Details

| Setting | Value |
|---------|-------|
| App Name | Biblical Journal |
| Package ID | `com.prince.biblicaljournal` |
