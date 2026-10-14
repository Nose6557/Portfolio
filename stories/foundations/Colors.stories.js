import { rootTokens, resolved, hex } from '../tokens.js';

export default {
  title: 'Основи/Кольори',
  parameters: { layout: 'padded' },
};

const PALETTE = /^--(white|black|gray-\d+|blue|green(-bright)?|indigo|orange|pink|purple|red|teal|yellow)$/;

const swatch = (name, alias) => {
  const value = resolved(name);
  return `
    <figure style="margin:0; display:flex; flex-direction:column; gap:8px; width:176px;">
      <div style="height:88px; border-radius:var(--radius-media); background:var(${name});
                  box-shadow: inset 0 0 0 1px var(--color-separator);"></div>
      <figcaption class="t-label" style="display:flex; flex-direction:column; gap:2px;">
        <span>${name}</span>
        <span style="color:var(--color-label-secondary)">${hex(value)}${alias ? ` · ${alias}` : ''}</span>
      </figcaption>
    </figure>`;
};

const section = (title, note, items) => `
  <section style="display:flex; flex-direction:column; gap:24px; margin-bottom:64px;">
    <div>
      <h2 class="t-h2" style="margin:0 0 8px;">${title}</h2>
      <p class="t-body" style="margin:0; color:var(--color-label-secondary); max-width:60ch;">${note}</p>
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:24px;">${items.join('')}</div>
  </section>`;

/** Raw Apple values. Components never use these directly. */
export const Palette = {
  render: () => {
    const tokens = rootTokens().filter(([n]) => PALETTE.test(n));
    return section(
      'Палітра',
      'Сирі значення Apple: нейтральні з apple.com, акценти — системні кольори HIG. Figma: колекція <b>Palette</b>.',
      tokens.map(([n]) => swatch(n)),
    );
  },
};

/** What each colour is for. The only tokens components use. */
export const Roles = {
  render: () => {
    const tokens = rootTokens().filter(([n]) => n.startsWith('--color-'));
    return section(
      'Ролі',
      'Для чого колір. Під назвою — на який свотч палітри посилається роль. Figma: колекція <b>Color</b>, змінні-аліаси.',
      tokens.map(([n, raw]) => swatch(n, raw.replace(/var\((--[\w-]+)\)/g, '$1'))),
    );
  },
};

/** Text roles on the backgrounds they are meant for. */
export const TextOnSurfaces = {
  name: 'Текст на фонах',
  render: () => {
    const block = (bg, rows) => `
      <div style="background:var(${bg}); padding:32px; border-radius:var(--radius-media);
                  box-shadow: inset 0 0 0 1px var(--color-separator); display:flex; flex-direction:column; gap:12px;">
        <span class="t-caption" style="color:${bg === '--color-bg-inverse' ? 'var(--color-label-inverse-secondary)' : 'var(--color-label-secondary)'}">${bg}</span>
        ${rows.map(([role, text]) => `<p class="t-title" style="margin:0; color:var(${role})">${text} <span class="t-caption">${role}</span></p>`).join('')}
      </div>`;
    return `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
        ${block('--color-bg', [['--color-label', 'Основний'], ['--color-label-secondary', 'Другорядний'], ['--color-label-tertiary', 'Вимкнений']])}
        ${block('--color-bg-secondary', [['--color-label', 'Основний'], ['--color-label-secondary', 'Другорядний']])}
        ${block('--color-bg-inverse', [['--color-label-inverse', 'Основний'], ['--color-label-inverse-secondary', 'Другорядний']])}
      </div>`;
  },
};
