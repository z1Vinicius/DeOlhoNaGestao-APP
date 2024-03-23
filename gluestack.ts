//gluestack style config
import { createConfig } from '@gluestack-style/react';

export const config = createConfig({
  aliases: {
    bg: 'backgroundColor',
    p: 'padding',
    m: 'margin',
    /* ... */
  },
  tokens: {
    colors: {
      rose50: '#fff1f2',
      rose100: '#ffe4e6',
      /* ... */
    },
    fonts: {
      /* ... */
    },
    space: {
    '0': 0,
    '0.5': 2,
    /* ... */
    },
    fontSizes: {
      /* ... */
    },
  },

} as const);

// Get the type of Config
type ConfigType = typeof config;

// Extend the internal styled config
declare module '@gluestack-style/react' {
  interface ICustomConfig extends ConfigType {}
}