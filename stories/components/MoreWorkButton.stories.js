/**
 * The «Більше робіт +» circle. Hover darkens it and turns the plus.
 * The magnetic pull toward the cursor comes from main.js, which runs on page
 * load and isn't loaded into Storybook — so here the circle stays put.
 */
export default {
  title: 'Компоненти/Кнопка «Більше робіт»',
  parameters: { layout: 'centered', backgrounds: { value: 'secondary' } },
  argTypes: { label: { name: 'Текст', control: 'text' } },
  args: { label: 'Більше робіт' },
  render: ({ label }) => `
    <div class="projects__row" style="display:block">
      <a class="projects__more" href="#">
        <span class="projects__more-text">${label} <span class="projects__more-plus">+</span></span>
      </a>
    </div>`,
};

export const Default = { name: 'Звичайна' };
export const Mobile = { name: 'Телефон', globals: { viewport: { value: 'mobile' } } };
