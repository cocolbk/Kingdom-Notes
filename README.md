# Kingdom Notes - Biblical Teaching Journal

A React Native app built with Capacitor for Android, designed to help users save, organize, search, and revisit church teachings, sermon notes, prayers, and confessions.

## Features

✅ **Add Teaching Notes** - Create new teachings with title, pastor name, scripture reference, main notes, prayer, and confession

✅ **Edit Teaching Notes** - Update any teaching with all details

✅ **Delete Teaching Notes** - Remove teachings with confirmation

✅ **Mark as Favorites** - Star teachings to quickly access important ones

✅ **Search Functionality** - Filter teachings by:
- Title
- Pastor Name
- Scripture Reference
- Date
- Content

✅ **Bottom Navigation** - Four main tabs:
- Home: View all teachings
- Search: Find teachings by keyword
- Favorites: Access starred teachings
- Profile: View app statistics and info

✅ **Local Storage** - All data stored locally with AsyncStorage (no internet needed)

✅ **Clean Mobile UI** - Modern card-based design with smooth animations

## Project Structure

```
src/
├── components/
│   ├── TeachingCard.tsx       # Individual teaching card component
│   ├── TeachingList.tsx       # List of teachings
│   ├── TeachingForm.tsx       # Form to add/edit teachings
│   └── SearchBar.tsx          # Search input component
├── screens/
│   ├── HomeScreen.tsx         # Main teachings list
│   ├── SearchScreen.tsx       # Search and filter
│   ├── FavoritesScreen.tsx    # Favorite teachings
│   ├── ProfileScreen.tsx      # App info and statistics
│   ├── AddTeachingScreen.tsx  # Add new teaching
│   ├── EditTeachingScreen.tsx # Edit existing teaching
│   └── ViewTeachingScreen.tsx # Full teaching view
├── types/
│   └── teaching.ts            # Teaching data type definition
├── utils/
│   ├── storage.ts             # AsyncStorage operations
│   └── sampleData.ts          # Sample teachings for first launch
└── App.tsx                    # Navigation setup
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cocolbk/Kingdom-Notes.git
   cd Kingdom-Notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Capacitor (Android)**
   ```bash
   npm run cap:android
   ```

## Running the App

### Development (React Native)
```bash
npm start
```

### Android with Capacitor
```bash
npm run cap:run
```

### Build APK
```bash
npm run cap:build
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## Building for Android

### Prerequisites
- Node.js and npm installed
- Android Studio installed
- Java Development Kit (JDK) 11 or later
- Android SDK API level 30+

### Steps

1. **Install all dependencies:**
   ```bash
   npm install
   ```

2. **Add Android platform:**
   ```bash
   npm run cap:android
   ```

3. **Sync Capacitor:**
   ```bash
   npx cap sync android
   ```

4. **Build Release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   cd ..
   ```

5. **APK Location:**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

## Data Structure

Each teaching contains:
- `id`: Unique identifier (UUID)
- `title`: Teaching title
- `pastorName`: Pastor's name
- `date`: Teaching date (YYYY-MM-DD format)
- `scriptureReference`: Bible verse reference
- `mainTeachingNotes`: Main teaching content
- `prayer`: Prayer notes
- `confession`: Confession notes
- `isFavorite`: Favorite status
- `createdAt`: Timestamp of creation

## Sample Data

The app comes with 3 sample teachings on first launch:
1. The Power of Prayer - Pastor James (Matthew 6:5-15)
2. Understanding God's Grace - Pastor Sarah (Ephesians 2:8-9)
3. Building a Strong Foundation in Christ - Pastor Michael (Matthew 7:24-27)

## Technologies Used

- **React Native** - Mobile framework
- **TypeScript** - Type-safe development
- **React Navigation** - Tab and stack navigation
- **AsyncStorage** - Local data persistence
- **Capacitor** - Android/iOS bridge
- **React Native Date Picker** - Date selection

## App Specifications

- **App Name**: Biblical Journal
- **Package ID**: com.prince.biblicaljournal
- **Target**: Android 12+ (API 31+)
- **Orientation**: Portrait
- **Storage**: Local AsyncStorage (no backend)

## License

MIT
