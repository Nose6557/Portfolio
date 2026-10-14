/**
 * Site header. Same markup as the pages. On the site main.js drives
 * --nav-shrink from 0 to 1 over the first 600px of scroll; here it's a control.
 * Below 1024px the links collapse into «Меню».
 */
export default {
  title: 'Компоненти/Хедер',
  argTypes: {
    current: {
      name: 'Поточна сторінка',
      control: 'inline-radio',
      options: ['Головна', 'Роботи', 'Про мене', 'Контакт'],
    },
    shrink: { name: 'Стиснення (скрол)', control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  args: { current: 'Головна', shrink: 0 },
  render: ({ current, shrink }) => {
    const links = ['Головна', 'Роботи', 'Про мене', 'Контакт']
      .map((l) => `<a href="#"${l === current ? ' aria-current="page"' : ''}>${l}</a>`).join('\n');
    return `
      <header class="site-nav" style="--nav-shrink:${shrink}; position:relative;">
        <div class="wrap site-nav__row">
          <a class="site-nav__name" href="#">Олександр Носач</a>
          <nav class="site-nav__links" aria-label="Основна навігація">
            ${links}
            <div class="lang-switch" role="group" aria-label="Мова сайту">
              <button type="button" class="lang-switch__part" data-lang="ua" data-active="true">UA</button> /
              <button type="button" class="lang-switch__part" data-lang="en" data-active="false">EN</button>
            </div>
          </nav>
          <button type="button" class="nav-toggle" aria-haspopup="true">Меню</button>
        </div>
      </header>`;
  },
};

export const Top = { name: 'Вгорі сторінки' };
export const Scrolled = { name: 'Після скролу', args: { shrink: 1 } };
export const Mobile = {
  name: 'Телефон',
  globals: { viewport: { value: 'mobile' } },
};
