/**
 * Site header. Same markup as the pages. No background and no shrink on
 * scroll: white type with mix-blend-mode: difference inverts whatever is
 * under it. Shown over a light and a dark strip to see both cases.
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
    dark: { name: 'Темний фон під хедером', control: 'boolean' },
  },
  args: { current: 'Головна', dark: false },
  render: ({ current, dark }) => {
    const links = ['Головна', 'Роботи', 'Про мене', 'Контакт']
      .map((l) => `<a href="#"${l === current ? ' aria-current="page"' : ''}>${l}</a>`).join('\n');
    return `
      <div style="background:${dark ? '#000' : '#fff'};">
      <header class="site-nav" style="position:relative;">
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
      </header>
      </div>`;
  },
};

export const Top = { name: 'Вгорі сторінки' };
export const OnDark = { name: 'На темному', args: { dark: true } };
export const Mobile = {
  name: 'Телефон',
  globals: { viewport: { value: 'mobile' } },
};
