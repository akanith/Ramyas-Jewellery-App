# Ramyas Jewellers — Component Guidelines

## Design Principles

1. **Premium Feel** — Every component should feel high-quality, like the jewellery it represents.
2. **Clarity** — Information hierarchy must be instantly clear. Customers should never feel lost.
3. **Trust** — Use consistent patterns to build familiarity and confidence.
4. **Performance** — Animations must be purposeful, not decorative noise.

## Button Components

| Variant | Usage | Notes |
|---|---|---|
| Primary | Main CTAs (Record Payment, Submit) | Gold background, white text |
| Secondary | Secondary actions (View Details) | Outlined gold border |
| Ghost | Tertiary actions (Cancel) | Text only, no background |
| Destructive | Delete/reject actions | Red, always confirm first |

**Rules**:
- Every page must have at most one Primary button visible at a time
- Buttons must show loading state during async operations
- Disabled buttons must have 40% opacity, not hidden

## Card Components

- Use `8px` border radius on all cards
- Cards should have subtle drop shadows, never harsh
- Card padding: `16px` (mobile), `24px` (desktop)
- Cards with interactive elements must show hover/press feedback

## Form Components

- All inputs must have accessible labels (never placeholder-only)
- Show inline validation messages in real time (on blur)
- Required fields are marked with `*` in the label
- Error state: red border + error message below input

## Data Tables (Admin)

- Always show row count and pagination controls
- Support column sorting with clear visual indicators
- Empty states must include an action button
- Loading state must use skeleton placeholders, not spinners

## Status Badges

| Status | Color | Usage |
|---|---|---|
| Active | Green | Scheme active / payment confirmed |
| Pending | Amber | Payment pending / processing |
| Overdue | Red | Missed payment |
| Completed | Blue | Scheme matured |
| Cancelled | Neutral | Scheme cancelled |

## Spacing Scale

| Token | Size | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Tight internal spacing |
| `space-3` | 12px | List item padding |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Section spacing |
| `space-8` | 32px | Large section gaps |
| `space-12` | 48px | Page section separators |
