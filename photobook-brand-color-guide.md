# Brand color guide — premium photo book website

Using your exact color set:

| Color | Hex | RGB |
|---|---|---|
| Black | `#000000` | (0,0,0) |
| Deep red | `#c5161d` | (197,22,29) |
| Orange | `#f26523` | (242,101,35) |
| Light orange | `#ff7931` | (255,121,49) |
| Gold | `#fdc930` | (253,201,48) |

You have four warm tones plus black — no neutral background color in the set. Below are two ways to use these: a **light premium** theme (recommended for a photo-editing product, since photos need a neutral surface to sit on) and a **dark premium** theme (moodier, more "luxury film" feeling). Pick one as your primary theme rather than mixing both.

---

## Option 1 — Light premium (recommended)

| Role | Hex | Use for |
|---|---|---|
| Primary / accent | `#f26523` | Primary buttons, logo, active states, links |
| Ink / text | `#000000` | Headings, body text, nav |
| Accent highlight | `#fdc930` | Small badges, favorite icons, progress fill |
| Secondary accent | `#c5161d` | Rare — sale/limited badges, error-adjacent states, never alongside orange in the same view |
| Hover / lighter accent | `#ff7931` | Button hover state, secondary CTA outline |
| Background (add this) | `#FAF6EE` (warm ivory, not in your set) | Page background — pure white will feel flat and clinical against these warm tones |
| Surface (add this) | `#FFFFFF` | Cards, editor panels, sitting above the ivory background |

**Why add ivory:** with true black as your only dark and no neutral, everything will look like a poster rather than a soft, premium print product unless the background has a little warmth. If you'd rather not introduce a new color, pure white (`#FFFFFF`) as background is the fallback — just expect a slightly flatter, more commercial feel.

---

## Option 2 — Dark premium (moodier, "gallery" feel)

| Role | Hex | Use for |
|---|---|---|
| Background | `#000000` | Page background, nav bar, footer |
| Surface | `#161513` (near-black, not in your set) | Cards, editor canvas, panels — pure black-on-black has no depth, needs one shade up |
| Primary / accent | `#f26523` | Primary buttons, active tool state |
| Accent highlight | `#fdc930` | Badges, favorites, small icon fills |
| Text | `#FFFFFF` / `#B8B4AC` | Headings white, secondary text warm light gray |
| Rare accent | `#c5161d` | Sparingly — "limited edition," sale tags |

---

## 2. The one rule that matters

**Only one of these warm colors should be the loud one on any given screen — orange.** Gold is for tiny details. Red is the rarest of all; treat it almost like a warning color (sale, limited, urgent) rather than an everyday brand color, since red next to orange in equal weight reads chaotic, not premium.

---

## 3. Placement by page

**Homepage / hero**
- Background: ivory (light) or black (dark)
- Headline + body: black or white
- One primary button: orange `#f26523`
- One small badge above headline: gold `#fdc930` background, black text

**Editing canvas**
- Canvas background: ivory/white (light) or `#161513` (dark) — never busy or colored, photos need a calm base
- Selected tool / active state: orange
- Progress bar: gold fill
- Alignment guides: light gray, never a brand color

**Checkout**
- Calmest screen: background + text only, one orange button. No red, no gold — save those for elsewhere.

---

## 4. Text-on-color contrast

| Background | Text color |
|---|---|
| Orange `#f26523` | Black `#000000` or white `#FFFFFF` — check both, black usually reads better here |
| Gold `#fdc930` | Black `#000000` (never white — too low contrast) |
| Red `#c5161d` | White `#FFFFFF` |
| Black `#000000` | White `#FFFFFF` |
| Ivory / white | Black `#000000` |

---

## 5. CSS variables

```css
:root {
  --color-black: #000000;
  --color-red: #c5161d;
  --color-orange: #f26523;
  --color-orange-light: #ff7931;
  --color-gold: #fdc930;

  /* light theme */
  --color-background: #FAF6EE;
  --color-surface: #FFFFFF;

  /* dark theme */
  --color-background-dark: #000000;
  --color-surface-dark: #161513;
}
```
