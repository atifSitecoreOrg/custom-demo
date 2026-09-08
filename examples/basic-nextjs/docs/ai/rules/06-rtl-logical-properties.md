# RTL and logical properties

Every new or touched component must stay RTL-safe without mirrored markup.

## Spacing and position
- Use logical Tailwind properties only: `ps-` / `pe-` / `ms-` / `me-` / `start-` / `end-`.
- Never use physical sides: `pl-` / `pr-` / `ml-` / `mr-` / `left-` / `right-`.
- Prefer `text-start` / `text-end` over `text-left` / `text-right`.
- Prefer `border-s` / `border-e` / `rounded-s` / `rounded-e` over left/right border and radius utilities.

## Arabic typography
- Arabic (`ar-AE`) text uses `leading-relaxed` or looser (~1.4).
- Never letter-space Arabic. If a Latin eyebrow uses tracking, scope it with `ltr:tracking-*` and `rtl:tracking-normal`.
- Arabic UI uses `--brand-arabic-font` on `html[dir="rtl"]`. Do not invent extra font tokens.

## Applies to
All components built or edited from this rule onward, including uiim, motion primitives, and demo variants.
