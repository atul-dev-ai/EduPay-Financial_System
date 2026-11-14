/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0F172A',
    textSecondary: '#64748B',
    background: '#F7F8FC',
    surface: '#FFFFFF',
    backgroundElement: '#EEF2F6',
    backgroundSelected: '#E2E8F0',
    primary: '#2547E8',
    primaryDark: '#0B1B4D',
    success: '#12B886',
    warning: '#F59F00',
    danger: '#E03131',
    border: '#E2E8F0',
    card: '#0B1B4D', // Premium Navy for balance card
  },
  dark: {
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    background: '#070D1E',
    surface: '#0F172A',
    backgroundElement: '#1E293B',
    backgroundSelected: '#334155',
    primary: '#3B66FF',
    primaryDark: '#0B1B4D',
    success: '#12B886',
    warning: '#F59F00',
    danger: '#EF4444',
    border: '#1E293B',
    card: '#0B1B4D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
