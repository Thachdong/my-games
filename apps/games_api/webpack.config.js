const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/games_api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: true }),
  ],
};
