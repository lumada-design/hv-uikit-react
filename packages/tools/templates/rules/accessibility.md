# HV UI Kit Accessibility Rules

## Image names

- **Id:** accessibility/name
- **Rule:** Provide meaningful text alternatives for informative images and avatars, and accessible names for icon-only controls. Use `alt` for image content and `aria-label` or `aria-labelledby` for controls. Purely decorative images use empty alt text and must not duplicate an adjacent accessible name.
- **Rationale:** Assistive technology needs the image's meaning or the action's purpose, not just its visual appearance. Whether an image is informative depends on its context.
- **Components:** HvAvatar, HvButton
- **Enforcement:** context-only

Examples:

```diff
- <HvAvatar src="user.jpg" />
+ <HvAvatar src="user.jpg" alt="John Doe" />
- <HvButton icon><Search /></HvButton>
+ <HvButton icon aria-label="Search"><Search /></HvButton>
```
