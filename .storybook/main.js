/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|mjs)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/html-vite',
  // Only the site's images — not the repo root, which holds node_modules.
  // (Mapping all of /assets would shadow the stylesheet Vite imports in preview.js.)
  staticDirs: [{ from: '../assets/images', to: '/assets/images' }],
};
export default config;
