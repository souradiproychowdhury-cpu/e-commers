---
name: Vogueur Atelier
colors:
  surface: '#fdf9f2'
  surface-dim: '#dddad3'
  surface-bright: '#fdf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ec'
  surface-container: '#f1ede6'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c17'
  on-surface-variant: '#444748'
  inverse-surface: '#31302c'
  inverse-on-surface: '#f4f0e9'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#994626'
  on-secondary: '#ffffff'
  secondary-container: '#ff956e'
  on-secondary-container: '#762c0d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#301400'
  on-tertiary-container: '#ad7853'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#7a2f10'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#f7b990'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#673c1c'
  background: '#fdf9f2'
  on-background: '#1c1c17'
  surface-variant: '#e5e2db'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: '400'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the tension between architectural restraint and tactile high-fashion sensuality. Tailored specifically for an elevated mobile-first editorial shopping platform, the visual language mirrors the cadence of a collectible printed monograph: vast negative space, measured pacing, authoritative editorial typography, and disciplined minimalism.

The aesthetic fuses **Minimalist Luxury** with **Subtle Tactility**. Product curation supersedes catalog density. High-contrast typography pairs with quiet, warm alabaster backgrounds to evoke effortless prestige and discernment. Interface chrome is stripped to essentials, transforming every UI component into a quiet pedestal that spotlights garment texture, silhouette, and craft.

## Colors

The palette establishes an intentional warm luminescence rather than harsh clinical starkness. Backgrounds rely on alabaster and warm parchment tones (`#FBFBF9` as base canvas and `#F5F5F2` for surface grouping), eliminating sterile pure white.

- **Primary (`#121212`):** Obsidian black, used for dominant typography, structural icons, and definitive action triggers.
- **Secondary (`#B85D3B`):** Warm terracotta, reserved exclusively for subtle editorial accents, archive alerts, limited runs, and rare notification pips.
- **Tertiary (`#9E6B47`):** Muted bronze, providing gentle richness across badge borders, metadata tags, and active state hints.
- **Neutral (`#D3D0C9` & `#E8E6E1`):** Stone and linen neutrals for ultra-delicate ghost dividers, search fields, and secondary surface layers.

Color is deployed with extreme discipline: saturated hues never fight the photography; instead, neutral shades preserve an atmosphere of curated calm.

## Typography

The typography pairs the high-contrast elegance of **Playfair Display** with the streamlined geometry of **Plus Jakarta Sans**. 

Display and headline scales emulate high-fashion mastheads and collection chapter breaks. Tracking on serif headings is kept neutral to slightly tight (`-0.02em`), evoking vintage publishing craft. Labels and product categories, styled in Plus Jakarta Sans, use uppercase styling with expanded letter-spacing (`0.08em` to `0.12em`) to provide legible, clean utility without detracting from editorial imagery.

## Layout & Spacing

The layout model is anchored on an adaptable fluid grid tailored for mobile portrait viewports (4 columns on mobile, expanding to 8 on tablet and 12 on desktop viewports). 

Negative space operates as a first-class aesthetic element. Generous vertical gaps between product units replicate the air and pacing of art gallery installations. 

- **Mobile Viewport:** `margin: 1.25rem`, `gutter: 1rem`. Product lookbooks alternate between full-bleed single-column feature spreads and structured two-column catalog tiles.
- **Desktop/Tablet Breakpoints:** Fluid reflow preserves maximum viewport containment for imagery (capped at standard editorial ratios such as 4:5 and 3:4). Sticky bottom navigation collapses on desktop viewports into an unobtrusive top navigation bar.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows in favor of **Tonal Layers** and **Low-Contrast Hairline Outlines**.

1. **Base Surface:** Flat alabaster (`#FBFBF9`).
2. **Elevated Containers & Sheets:** Modal drawers and bottom-sheet filters use `#F5F5F2` accented by a whisper of a border (`1px solid #E8E6E1`).
3. **Ambient Floats:** Floating interaction elements (such as sticky "Add to Bag" bars or quick-view triggers) use a featherlight ambient shadow: `box-shadow: 0 12px 32px -8px rgba(18, 18, 18, 0.06)`.
4. **Backdrop Blur:** Glass overlays for navigation bars and sticky headers apply `backdrop-filter: blur(12px)` over a 90% semi-opaque alabaster foundation, allowing garment imagery to drift subtly beneath.

## Shapes

The design system maintains an architectural, tailored shape language. 

Garment frames, media containers, cards, and modal dialogs use soft, disciplined corners (`0.25rem` radius) or sharp right angles for image bounding boxes to retain the feeling of high-end editorial paper stock. Pill-shaped geometry (`9999px`) is strictly reserved for interactive tags, filter chips, and stock status badges, creating a distinct functional contrast between content frames and touch targets.

## Components

### Buttons
- **Primary Action:** Solid obsidian (`#121212`), high-contrast off-white text (`#FBFBF9`), uppercase 11px label styling with 0.1em tracking. Default height is 52px for mobile accessibility with subtle `0.25rem` corners.
- **Secondary / Ghost:** 1px hairline border in `#D3D0C9` over transparent canvas, transitioning to `#121212` border and text on active state.
- **Micro-Interaction:** 150ms ease-out gentle scale compression (`scale(0.98)`) on press.

### Chips & Badges
- **Editorial Badges ("Run of 50", "Pre-Order"):** Pill-shaped (`rounded-full`), with a muted bronze or terracotta background tint (`#B85D3B` at 10% opacity) and crisp terracotta typography.
- **Filter Chips:** Pill-shaped, neutral stone border (`#E8E6E1`), active states fill with `#121212` and text flips to `#FBFBF9`.

### Input Fields
- Understated architectural lines: borderless body with a single `1px` bottom baseline in `#D3D0C9`. When focused, baseline transitions cleanly to obsidian (`#121212`) with an animated 200ms ease. Placeholder text styled in delicate Plus Jakarta Sans (`#9E6B47` or `#737373`).

### Cards & Media Frames
- **Editorial Product Card:** Strict 4:5 or 3:4 aspect ratio. Images feature raw, crisp edges (`roundedness: 0` for photos) framed within a minimal `#F5F5F2` mat. Typography sits beneath the image frame with generous vertical spacing: Playfair Display title, right-aligned price in obsidian, and subtle category metadata in uppercase sans-serif.

### Sticky Bag Drawer
- Fixed-bottom mobile bar anchored with high-touch tactile elements: immediate garment selector swatches, size pill selectors with active ring indicators, and a full-width obsidian primary checkout trigger.