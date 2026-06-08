module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
    ['@react-native/babel-preset', { useTransformReactJSXExperimental: true }],
  ],
}