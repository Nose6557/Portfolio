// The site's own stylesheet — stories render with exactly the CSS the pages use.
import '../assets/css/style.css';

// Every page carries body.redesign; the site's rules are scoped under it.
// The `.js` class is left off on purpose, so scroll-reveal content shows
// at once instead of waiting for main.js.
document.body.classList.add('redesign');

/** The two Figma modes the type scale interpolates between, plus a laptop. */
const viewports = {
  mobile: { name: 'Mobile · 375', styles: { width: '375px', height: '812px' }, type: 'mobile' },
  tablet: { name: 'Tablet · 768', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
  laptop: { name: 'Laptop · 1440', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
  desktop: { name: 'Desktop · 1920', styles: { width: '1920px', height: '1080px' }, type: 'desktop' },
};

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    layout: 'fullscreen',
    viewport: { options: viewports },
    backgrounds: {
      options: {
        page: { name: 'Bg/Primary', value: '#ffffff' },
        secondary: { name: 'Bg/Secondary', value: '#f5f5f7' },
        inverse: { name: 'Bg/Inverse', value: '#000000' },
      },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: { order: ['Вступ', 'Основи', ['Кольори', 'Типографіка'], 'Компоненти'] },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'page' },
  },
};

export default preview;
