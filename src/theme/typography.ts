import {TextStyle} from 'react-native';
import {colors} from './colors';

export const typography = {
  hero: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  } as TextStyle,
  h1: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  } as TextStyle,
  h2: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  } as TextStyle,
  h3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  } as TextStyle,
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  } as TextStyle,
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
    letterSpacing: 0.3,
  } as TextStyle,
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  } as TextStyle,
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  } as TextStyle,
} as const;
