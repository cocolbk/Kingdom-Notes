# Kingdom Notes

**Capture • Preserve • Grow Through God's Word**

Kingdom Notes is a simple, offline-first mobile journal for saving church teachings, sermon notes, prayers, and confessions.

**Repository:** [github.com/cocolbk/Kingdom-Notes](https://github.com/cocolbk/Kingdom-Notes)

## Features

- **Teaching Notes** — Add, edit, and delete teaching entries
- **Favorites** — Star teachings for quick access
- **Search** — Find notes by title, pastor, scripture, date, or content
- **Prayer Journal** — All prayers from your teachings in one place
- **Confession Library** — Your personal library of faith confessions
- **Daily Confession** — Rotating confession card on the home screen
- **Recent Teachings** — Latest teachings at a glance
- **Offline Storage** — All data saved locally on your device

## Each Teaching Includes

| Field | Description |
|-------|-------------|
| Title | Sermon or teaching title |
| Pastor Name | Who preached the message |
| Date | When the teaching was received |
| Scripture References | Bible passages referenced |
| Main Teaching Notes | Key points and insights |
| Prayer | Personal or altar prayers |
| Confession | Faith confessions to declare |

## Tech Stack

- React Native UI (via react-native-web)
- TypeScript
- Vite (web build)
- Capacitor 6 (Android packaging)
- React Navigation
- AsyncStorage (offline-first, no backend)

## Getting Started

### Prerequisites

- Node.js 22+
- Android SDK (API 34+) for APK builds
- JDK 17+

### Install

```bash
npm install
```

### Web Development

```bash
npm run dev
```

Open the local URL shown in the terminal to preview the app in your browser.

### Capacitor Android Workflow

1. Build the web bundle and sync to Android:

```bash
npm run cap:sync
```

2. Open in Android Studio (optional):

```bash
npm run cap:open:android
```

3. Build a debug APK:

```bash
npm run build:android:debug
```

4. Build a release APK:

```bash
npm run build:android
```

### APK Output Paths

| Build | Output |
|-------|--------|
| Debug | `android-cap/app/build/outputs/apk/debug/app-debug.apk` |
| Release | `android-cap/app/build/outputs/apk/release/app-release-unsigned.apk` |

### Android SDK Setup

Copy `android-cap/local.properties.template` to `android-cap/local.properties` and set your SDK path:

```properties
sdk.dir=C:/Users/YourName/AppData/Local/Android/Sdk
```

Or set the `ANDROID_HOME` environment variable.

### Generate App Icons

```bash
npm run generate:assets
```

## Project Structure

```
Kingdom-Notes/
├── android-cap/          # Capacitor Android project (APK builds)
├── android/              # React Native Android project (optional)
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # TeachingContext (state + storage)
│   ├── navigation/       # App navigator
│   ├── screens/          # All app screens
│   ├── storage/          # AsyncStorage helpers
│   ├── theme/            # Colors, typography, spacing
│   ├── types/            # TypeScript interfaces
│   └── utils/            # Date formatting, search helpers
├── App.tsx               # Root component
├── capacitor.config.ts   # Capacitor configuration
├── index.html            # Web entry HTML
├── vite.config.ts        # Vite bundler config
└── package.json
```

## App Details

| Setting | Value |
|---------|-------|
| App Name | Kingdom Notes |
| Package Name | `com.kingdomnotes.app` |
| Tagline | Capture • Preserve • Grow Through God's Word |
| Storage | AsyncStorage (on-device) |
| Network | Offline-first |

## Design

- **Primary** — Deep navy (`#1B3A4B`)
- **Accent** — Gold (`#C9A227`)
- **Background** — Warm cream (`#F7F4EF`)

## License

Private project for personal spiritual journaling.
