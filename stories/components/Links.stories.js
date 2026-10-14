/**
 * Links with the animated underline: hidden at rest, it slides in from the
 * left on hover and leaves to the right. Hover each one.
 */
export default {
  title: 'Компоненти/Посилання',
  parameters: { layout: 'padded' },
};

/** Inline link inside running text and the small standalone one. */
export const TextLinks = {
  name: 'Текстові',
  render: () => `
    <div style="display:flex; flex-direction:column; gap:32px; max-width:56ch;">
      <p class="t-body" style="margin:0">
        Про підхід і рішення можу розповісти особисто —
        <a class="text-link" href="#">напишіть</a>, і домовимось про розмову.
      </p>
      <p class="about__more" style="margin:0"><a class="text-link" href="#">Детальніше →</a></p>
    </div>`,
};

/** Header navigation: the current page keeps its line. */
export const Navigation = {
  name: 'Навігація',
  render: () => `
    <nav class="site-nav__links" style="display:flex; gap:var(--gap-32);">
      <a href="#" aria-current="page">Головна</a><a href="#">Роботи</a><a href="#">Про мене</a><a href="#">Контакт</a>
    </nav>`,
};

/** On the black footer. */
export const OnDark = {
  name: 'На темному',
  parameters: { backgrounds: { value: 'inverse' } },
  render: () => `
    <div class="contacts" style="padding:48px; display:flex; flex-direction:column; gap:var(--gap-40);">
      <h2 class="contacts__email"><a href="#">Nose6557@gmail.com</a></h2>
      <div class="contacts__links"><a class="contacts__link" href="#">LinkedIn</a><a class="contacts__link" href="#">Резюме PDF</a></div>
    </div>`,
};
