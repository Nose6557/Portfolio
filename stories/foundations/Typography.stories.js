import { resolved } from '../tokens.js';

export default {
  title: 'Основи/Типографіка',
  parameters: { layout: 'padded' },
};

/** Figma name · token prefix · CSS class · weight · case · sample. Sizes come from style.css. */
const STYLES = [
  ['Display', 'display', 't-display', 'Regular', 'As typed', 'Роблю складні продукти простими'],
  ['Heading/1', 'h1', 't-h1', 'Regular', 'As typed', 'Обрані проєкти'],
  ['Heading/2', 'h2', 't-h2', 'Regular', 'As typed', 'Більше робіт +'],
  ['Heading/3', 'h3', 't-h3', 'Regular', 'As typed', 'Шлях менеджера до угоди: з 11 кроків до 4'],
  ['Title', 'title', 't-title', 'Regular', 'As typed', 'Головна · Роботи · Про мене · Контакт'],
  ['Overline/M', 'overline-m', 't-overline-m', 'Regular', 'Upper', 'Пишіть'],
  ['Body', 'body', 't-body', 'Light', 'As typed', 'Менеджер вводив те, що система вже знала. Прибрали чотири кроки, які лише підтверджували побачене на попередньому екрані.'],
  ['Label', 'label', 't-label', 'Regular', 'As typed', 'Детальніше →'],
  ['Caption', 'caption', 't-caption', 'Regular', 'Upper', 'B2B SaaS · логістика · команда 60'],
];

const pct = (n) => `${Math.round(parseFloat(n) * 100)}%`;
const em = (v) => (v === '0' ? '0%' : `${Math.round(parseFloat(v) * 1000) / 10}%`);

/**
 * The whole scale. Switch the viewport in the toolbar (Mobile 375 ↔ Desktop
 * 1920) and every sample re-sizes; "зараз" shows the size at this width.
 */
export const Scale = {
  name: 'Шкала',
  render: () => {
    const rows = STYLES.map(([name, key, cls, weight, kase, sample]) => `
      <article class="type-row" data-key="${key}"
               style="display:grid; grid-template-columns:minmax(200px, 260px) 1fr; gap:16px 48px;
                      padding:32px 0; border-top:1px solid var(--color-separator);">
        <dl class="t-caption" style="margin:0; display:grid; grid-template-columns:auto 1fr; gap:6px 16px; align-content:start; color:var(--color-label-secondary);">
          <dt style="color:var(--color-label)">${name}</dt><dd style="margin:0">.${cls}</dd>
          <dt>Розмір</dt><dd style="margin:0">${resolved(`--${key}-mobile`)} / ${resolved(`--${key}-desktop`)} px</dd>
          <dt>Зараз</dt><dd style="margin:0" data-now>—</dd>
          <dt>LH · LS</dt><dd style="margin:0">${pct(resolved(`--${key}-lh`))} · ${em(resolved(`--${key}-ls`))}</dd>
          <dt>Вага · Case</dt><dd style="margin:0">${weight} · ${kase}</dd>
        </dl>
        <p class="${cls}" style="margin:0; color:var(--color-label); min-width:0; overflow-wrap:anywhere;">${sample}</p>
      </article>`).join('');

    const root = document.createElement('div');
    root.innerHTML = `
      <p class="t-body" style="margin:0 0 32px; color:var(--color-label-secondary); max-width:64ch;">
        Розмір кожного стилю росте від Mobile (375) до Desktop (1920). Значення редагуються
        в <code>:root</code> → блок <code>TYPOGRAPHY</code>; у Figma — колекція <b>Type</b> з тими ж двома режимами.
      </p>${rows}`;

    // "Now" column: the size each sample actually renders at this viewport.
    const update = () => root.querySelectorAll('.type-row').forEach((row) => {
      const size = parseFloat(getComputedStyle(row.querySelector('p')).fontSize);
      row.querySelector('[data-now]').textContent = `${Math.round(size * 10) / 10} px`;
    });
    requestAnimationFrame(update);
    window.addEventListener('resize', update);
    return root;
  },
};
