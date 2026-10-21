# HV UI Kit Token Rules

Use design tokens for every color, spacing value, and text style.

## Colors

- **Id:** tokens/color
- **Rule:** Use semantic tokens only: `primary`, `secondary`, `positive`, `negative`, and `warning`. Never use raw hex, rgb, or named colors.
- **Rationale:** Semantic tokens keep colors consistent with the theme.
- **Components:** none
- **Enforcement:** checked
- **Fix:** Replace raw color values with the appropriate semantic color token.

```diff
- <div style={{ color: "#FF0000" }}>{content}</div>
+ <div style={{ color: theme.colors.negative }}>{content}</div>
```

## Spacing

- **Id:** tokens/space
- **Rule:** Use token values: `xxs`, `xs`, `sm`, `md`, `lg`, and `xl`. Never use raw pixel values or custom margins/padding.
- **Rationale:** Spacing tokens preserve a consistent spacing scale.
- **Components:** none
- **Enforcement:** checked
- **Fix:** Replace custom spacing values with the corresponding space tokens.

```diff
- <div style={{ padding: "24px", marginBottom: "16px" }}>{content}</div>
+ <div style={{ padding: theme.space.md, marginBottom: theme.space.sm }}>{content}</div>
```

## Typography

- **Id:** tokens/typography
- **Rule:** Use `HvTypography` with semantic variants for display, headings, body, caption, and label text. Never use inline font-size or font-weight.
- **Rationale:** Semantic typography keeps text styles and visual hierarchy consistent.
- **Components:** HvTypography
- **Enforcement:** context-only

```diff
- <div style={{ fontSize: 24, fontWeight: 600 }}>Assets</div>
+ <HvTypography variant="title2">Assets</HvTypography>
```
