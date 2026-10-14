/** A row from the «Роботи» list. Hover a published one to see its title underline. */
export default {
  title: 'Компоненти/Рядок роботи',
  parameters: { layout: 'padded' },
  argTypes: {
    index: { name: 'Номер', control: 'text' },
    title: { name: 'Назва', control: 'text' },
    descriptor: { name: 'Опис', control: 'text' },
    meta: { name: 'Мета', control: 'text' },
    published: { name: 'Опубліковано', control: 'boolean' },
  },
  args: {
    index: '01',
    title: 'Шлях до угоди: з 11 кроків до 4',
    descriptor: 'B2B SAAS · логістика · команда 60',
    meta: '2024 · дивитись ↗',
    published: true,
  },
  render: ({ index, title, descriptor, meta, published }) => {
    const tag = published ? 'a' : 'div';
    return `
      <section class="work-list">
        <${tag} class="work-row${published ? '' : ' work-row--soon'}"${published ? ' href="#"' : ''}>
          <span class="work-row__index">${index}</span>
          <div class="work-row__main">
            <div class="work-row__thumb">${published ? '16:9' : '—'}</div>
            <div class="work-row__text">
              <h2 class="work-row__title"><span>${title}</span></h2>
              <p class="work-row__descriptor">${descriptor}</p>
            </div>
          </div>
          <span class="work-row__meta">${meta}</span>
        </${tag}>
      </section>`;
  },
};

export const Published = { name: 'Опублікований' };
export const InProgress = {
  name: 'У роботі',
  args: { index: '04', title: 'Кейс у роботі', descriptor: 'EDTECH · платформа для шкіл · команда 30', meta: '2026 · у роботі', published: false },
};
