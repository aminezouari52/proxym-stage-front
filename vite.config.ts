// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { readdirSync } from 'fs';
import svgr from 'vite-plugin-svgr';

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = path.resolve('./src/');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map(
  (dirent) => dirent.name.replace(/(\.ts){1}(x?)/, '')
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  plugins: [react(), svgr()],
  css: { modules: { localsConvention: 'camelCase' } },

  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
});
