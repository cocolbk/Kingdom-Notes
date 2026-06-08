import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const rnWeb = path.resolve(__dirname, 'node_modules/react-native-web');

function resolveReactNativeWebExtensions(): Plugin {
  return {
    name: 'resolve-react-native-web-extensions',
    resolveId(source, importer) {
      if (!importer || !source.startsWith('.')) {
        return null;
      }

      if (!importer.includes('react-native-screens')) {
        return null;
      }

      const base = path.resolve(path.dirname(importer), source);
      const candidates = [
        `${base}.web.js`,
        `${base}.web.jsx`,
        `${base}.web.ts`,
        `${base}.web.tsx`,
      ];

      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          return candidate;
        }
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [react(), resolveReactNativeWebExtensions()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(
          __dirname,
          'src/web-shims/codegenNativeComponent.ts',
        ),
      },
      {
        find: 'react-native/Libraries/ReactNative/AppContainer',
        replacement: path.join(rnWeb, 'dist/exports/AppRegistry/AppContainer.js'),
      },
      {
        find: 'react-native',
        replacement: rnWeb,
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ],
  },
  define: {
    global: 'window',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
      ],
      alias: {
        'react-native': rnWeb,
        'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(
          __dirname,
          'src/web-shims/codegenNativeComponent.ts',
        ),
        'react-native/Libraries/ReactNative/AppContainer': path.join(
          rnWeb,
          'dist/exports/AppRegistry/AppContainer.js',
        ),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
