---
name: Fragata High-Tech
colors:
  surface: '#081421'
  surface-dim: '#081421'
  surface-bright: '#2e3a48'
  surface-container-lowest: '#040f1b'
  surface-container-low: '#101c29'
  surface-container: '#15202d'
  surface-container-high: '#1f2b38'
  surface-container-highest: '#2a3643'
  on-surface: '#d7e3f5'
  on-surface-variant: '#bfc7d1'
  inverse-surface: '#d7e3f5'
  inverse-on-surface: '#26313f'
  outline: '#8a919b'
  outline-variant: '#404850'
  surface-tint: '#94ccff'
  primary: '#94ccff'
  on-primary: '#003352'
  primary-container: '#0077b6'
  on-primary-container: '#f3f7ff'
  inverse-primary: '#006399'
  secondary: '#83d3e1'
  on-secondary: '#00363d'
  secondary-container: '#006b78'
  on-secondary-container: '#99e9f8'
  tertiary: '#a5c8ff'
  on-tertiary: '#00315f'
  tertiary-container: '#4d73a7'
  on-tertiary-container: '#f6f7ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#9feffe'
  secondary-fixed-dim: '#83d3e1'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#004f59'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a5c8ff'
  on-tertiary-fixed: '#001c3a'
  on-tertiary-fixed-variant: '#1e4879'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    letterSpacing: 0.05em
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    letterSpacing: 0.08em
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built on a narrative of technological transcendence and cosmic exploration. It leverages a high-tech, futuristic aesthetic that feels both expansive and precise. The core visual language is rooted in **Glassmorphism** and **High-Contrast Dark Mode**, mimicking the interface of a starship or a sophisticated digital command center.

The brand personality is visionary, secure, and powerful. It aims to evoke a sense of "boundless potential" through the use of deep oceanic blacks and vibrant light-emitting accents. By combining translucent layers with sharp, glowing interactive elements, the design system creates a multi-dimensional workspace that feels immersive and advanced.

**Visual Principles:**
- **Luminosity:** Use light as a functional tool for hierarchy and focus, mimicking the energy beam in the source imagery.
- **Transparency:** Utilize depth through layered glass surfaces to maintain a sense of space.
- **Precision:** Clean lines and high-contrast typography ensure clarity amidst the atmospheric effects.

## Colors

The palette is derived from the light of a distant star emerging from the deep void. 

- **Primary (#0077B6):** A vibrant "Energy Blue" used for primary actions and core branding elements.
- **Secondary (#90E0EF):** A "Cyan Highlight" used for high-visibility accents, status indicators, and glowing effects.
- **Tertiary (#003566):** A "Navy Void" used for surface containers and background layering.
- **Neutral (#000814):** The "Deep Cosmic Black" that serves as the foundation for the entire dark mode experience.

Colors should be applied with high contrast in mind. Avoid muddy grays; instead, use low-opacity blues for neutral states to maintain the cosmic temperature of the interface.

## Typography

The typography system uses **Space Grotesk** for headlines and display text to create a futuristic tech identity. For body text, **Plus Jakarta Sans** provides clean, modern readability. For labels and badges, **JetBrains Mono** adds a technical, code-inspired accent.

**Usage Rules:**
- **Display & Headlines:** Use tight letter-spacing and bold weights (Space Grotesk) to command attention.
- **Body:** Maintain generous line-heights for readability against dark backgrounds (Plus Jakarta Sans).
- **Labels:** Always use JetBrains Mono for metadata, status tags, and technical labels to differentiate them from prose content.
- **Mobile Scaling:** For mobile, `display-lg` should scale down to 32px, and `headline-lg` to 24px.

## Layout & Spacing

This design system employs a **Fluid Grid** model with a base-8 rhythm. The layout should feel airy and expansive, reflecting the vastness of space.

- **Desktop:** A 12-column grid with a maximum content width of 1440px. Use 24px gutters and 64px outer margins.
- **Tablet:** An 8-column grid with 24px gutters and 32px outer margins.
- **Mobile:** A 4-column grid with 16px gutters and 16px outer margins.

Spacing should be used to create clear groupings. Larger "XL" spacing increments are encouraged between major sections to emphasize a minimalist, premium feel.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** rather than traditional drop shadows. Instead of casting shadows downward, elements "float" through background blurring and inner luminescence.

1.  **Level 0 (Base):** The Deep Cosmic Black (#081421) background.
2.  **Level 1 (Surface):** Semi-transparent Navy (#003566) with a 12px backdrop-filter blur. Use a 1px solid border at 10% opacity white to define edges.
3.  **Level 2 (Active):** Higher opacity glass with a subtle inner glow (box-shadow: inset 0 0 10px rgba(144, 224, 239, 0.1)).
4.  **Level 3 (Overlay):** Modals and flyouts with a 20px backdrop-filter blur and a more prominent secondary-color border.

Avoid drop shadows unless they are "Glow Shadows" used specifically for primary buttons and active indicators.

## Shapes

The shape language is **Soft (0.25rem / 4px base)**. While the overall vibe is futuristic, excessively rounded or "bubbly" corners are avoided to maintain a professional, high-tech edge. 

- **Small Components (Inputs, Chips):** 4px (rounded-sm)
- **Medium Components (Cards, Modals):** 8px (rounded-lg)
- **Interactive Accents:** Occasionally use 0px corners for specific technical data visualizations to provide a "harder" industrial feel.

## Components

### Buttons
- **Primary:** Solid Vibrant Blue (#0077B6) with a 15px cyan glow effect on hover. Text is white, semi-bold.
- **Secondary (Glass):** Transparent background with a 1px Cyan (#90E0EF) border. Subtle backdrop-blur.
- **Tertiary:** Ghost style with JetBrains Mono labels and no background.

### Input Fields
- **Default:** Deep Navy background (Level 1 Surface), 1px subtle border.
- **Focus:** Border transitions to Secondary Cyan with a soft outer "energy" glow. Label floats upward and shrinks.

### Cards
- **Structure:** Glassmorphic containers with 12px blur. 
- **Header:** Use JetBrains Mono labels for category identification at the top right of the card.

### Chips & Badges
- **Status:** Small, pill-shaped with high-saturation backgrounds but low opacity (e.g., 20% blue background with 100% blue text).

### Lists
- Separated by thin, 1px lines of #003566. Hover states should trigger a subtle increase in the glass background's opacity.

### Navigation
- Vertical or horizontal bars should use the highest level of backdrop-blur (24px+) to ensure content remains legible as it scrolls underneath.
