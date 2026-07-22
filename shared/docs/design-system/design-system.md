# Ramyas App — Design System

## Overview

The Ramyas App design system ensures visual consistency across the Admin Dashboard (web) and the Customer App (mobile).

## Design Language

**Theme**: Premium Jewellery — Warm Gold on Deep Dark

The visual identity reflects the trust, elegance, and warmth of a family jewellery store. Every UI element should feel premium, accessible, and culturally resonant.

## Core Tokens

| Category | Reference |
|---|---|
| Colors | [colors.md](../../../branding/color-palette/colors.md) |
| Typography | [typography.md](../../../branding/typography/typography.md) |
| Components | [guidelines.md](../../../branding/component-guidelines/guidelines.md) |

## Component Library

### Admin Dashboard (Web)
Built on **shadcn/ui** + **Radix UI** primitives with Tailwind CSS customisation.

Components to customise:
- `Button` — Gold primary variant
- `Card` — Jewellery-themed shadows and borders
- `Table` — Sortable with custom pagination
- `Badge` — Payment status variants
- `Dialog` — Confirmation dialogs with proper focus trap
- `Form` — Zod-validated inputs with inline errors
- `Chart` — Recharts with brand color palette

### Customer App (Mobile)
Built on **Flutter Material 3** with custom `ThemeData`.

Components to build:
- `PrimaryButton` — Gold gradient button
- `SchemeSummaryCard` — Progress bar + payment count
- `PaymentCard` — Individual payment tile
- `StatusChip` — Coloured status indicator
- `AppBottomNavBar` — Custom navigation bar
- `SchemeProgressBar` — Custom linear progress indicator

## Icon Set

Icons from **Lucide Icons** (web) and **Material Symbols** (mobile).

Custom icons (to be designed in SVG):
- Jewellery/ring icon
- Scheme progress icon
- Gold bar icon

## Animation Principles

- Duration: 150ms (micro), 300ms (standard), 500ms (entrance)
- Easing: `ease-out` for entrance, `ease-in` for exit
- Never animate more than 2 properties simultaneously
- Respect `prefers-reduced-motion` on web
