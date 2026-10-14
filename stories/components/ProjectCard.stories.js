/**
 * Project card from «Обрані проєкти». Hover it: the image grows inside the
 * frame and the title and description sink — the same CSS as on the site.
 */
export default {
  title: 'Компоненти/Картка проєкту',
  parameters: { layout: 'padded', backgrounds: { value: 'secondary' } },
  argTypes: {
    title: { name: 'Назва', control: 'text' },
    desc: { name: 'Опис', control: 'text' },
    media: { name: 'Обкладинка', control: 'inline-radio', options: ['photo', 'placeholder'] },
    shape: { name: 'Формат', control: 'inline-radio', options: ['tall', 'square'] },
    linked: { name: 'Є посилання', control: 'boolean' },
    width: { name: 'Ширина, px', control: { type: 'range', min: 240, max: 600, step: 8 } },
  },
  args: {
    title: 'Шлях менеджера до угоди: з 11 кроків до 4',
    desc: 'B2B SaaS · логістика · команда 60 · 2024',
    media: 'photo',
    shape: 'tall',
    linked: true,
    width: 504,
  },
  render: ({ title, desc, media, shape, linked, width }) => {
    const mediaCls = ['card__media', media === 'placeholder' && 'card__media--empty', shape === 'square' && 'card__media--square']
      .filter(Boolean).join(' ');
    const img = media === 'photo'
      ? '<img src="/assets/images/case-deal-flow.jpg" alt="" width="1280" height="1920">' : '';
    const inner = `
      <div class="${mediaCls}">${img}</div>
      <div class="card__body">
        <h3 class="card__title">${title}</h3>
        <p class="card__desc">${desc}</p>
      </div>`;
    return `
      <article class="card" style="width:${width}px">
        ${linked ? `<a class="card__link" href="#">${inner}</a>` : inner}
      </article>`;
  },
};

export const WithImage = { name: 'З обкладинкою' };
export const Placeholder = {
  name: 'Заглушка',
  args: { media: 'placeholder', title: 'Звірка платежів без перших трьох днів місяця', desc: 'FINTECH · внутрішній інструмент · команда 12 · 2023' },
};
export const Square = {
  name: 'Квадратна, без посилання',
  args: { media: 'placeholder', shape: 'square', linked: false, width: 320, title: 'Проєкт під NDA', desc: 'RETAIL · адмінка · команда 18' },
};
