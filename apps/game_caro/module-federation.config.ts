import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'game_caro',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
