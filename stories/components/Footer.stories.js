/**
 * The black footer every page ends with. On the site it sits under the page
 * and is uncovered by scrolling; main.js fades its content in. Here it's shown
 * open, with the content visible.
 */
export default {
  title: 'Компоненти/Футер',
  argTypes: {
    label: { name: 'Підпис', control: 'text' },
    email: { name: 'Пошта', control: 'text' },
  },
  args: { label: 'Пишіть', email: 'Nose6557@gmail.com' },
  render: ({ label, email }) => `
    <section class="contacts" aria-label="Контакти" style="position:relative">
      <div class="contacts__inner wrap">
        <div class="contacts__text">
          <p class="contacts__label">${label}</p>
          <h2 class="contacts__email"><a href="mailto:${email}">${email}</a></h2>
          <div class="contacts__links">
            <a class="contacts__link" href="#">LinkedIn</a>
            <a class="contacts__link" href="#">Резюме PDF</a>
          </div>
        </div>
      </div>
    </section>`,
};

export const Desktop = { name: 'Десктоп' };
export const Mobile = { name: 'Телефон', globals: { viewport: { value: 'mobile' } } };
