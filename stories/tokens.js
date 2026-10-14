/**
 * Reads design tokens straight from the site's stylesheet, so the
 * foundation stories can never drift from style.css: rename or recolour a
 * token there and the story shows it on the next reload.
 */

/** Every custom property declared on :root, in source order: [name, raw value]. */
export function rootTokens() {
  const out = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }   // cross-origin (fonts)
    for (const rule of rules) {
      if (rule.selectorText !== ':root') continue;
      for (const name of rule.style) {
        if (name.startsWith('--')) out.push([name, rule.style.getPropertyValue(name).trim()]);
      }
    }
  }
  return out;
}

/** The value a token resolves to on the page. */
export const resolved = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** A resolved colour as #RRGGBB (or the browser's own string if it has alpha). */
export function hex(value) {
  const probe = document.createElement('i');
  probe.style.color = value;
  document.body.append(probe);
  const rgb = getComputedStyle(probe).color;
  probe.remove();
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m || (m[4] !== undefined && m[4] !== '1')) return rgb;
  return '#' + m.slice(1, 4).map((n) => (+n).toString(16).padStart(2, '0')).join('').toUpperCase();
}
