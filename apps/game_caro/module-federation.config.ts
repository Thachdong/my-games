import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'game_caro',
  exposes: {
    './Module': './src/remote-entry.ts',
    "./GameCaroUi": "libs/game_caro_ui/src/index.ts",
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
