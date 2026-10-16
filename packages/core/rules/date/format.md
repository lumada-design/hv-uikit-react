---
id: date/format
title: Show dates in the user's locale, never as raw ISO strings
components: [HvDatePicker]
enforcement: checked
fix: "Format dates for display with Intl.DateTimeFormat (or toLocaleDateString) in the user's locale; pass HvDatePicker a Date."
status: example
---

## Rule

Keep dates as `Date` values (or ISO strings) in data, and format them only for
display, with the user's locale: `Intl.DateTimeFormat` or
`toLocaleDateString(locale, options)` for read-only text, and `HvDatePicker`
(with `locale`) for input. Pass `HvDatePicker` a `Date` in `value`, never a
string. Never render an ISO string, `Date.toString()` or a hand-built
`dd/mm/yyyy` string to the user.

## Rationale

ISO strings and `toString()` output are for machines: they show time zones,
`T` separators and seconds nobody asked for. Hand-built formats break for users
in other locales and drift between screens. Formatting at the edge keeps one
behaviour everywhere and lets the locale decide.

## Do

```tsx
const formatDate = (iso: string, locale = navigator.language) =>
  new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso));

<HvTableCell>{formatDate(row.updatedAt)}</HvTableCell>

<HvDatePicker label="Start date" value={startDate} onChange={setStartDate} locale={locale} />
```

## Don't

```tsx
<HvTableCell>{row.updatedAt}</HvTableCell>                 // "2026-10-16T09:14:00.000Z"
<HvTableCell>{new Date(row.updatedAt).toString()}</HvTableCell>
<HvTableCell>{`${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`}</HvTableCell> // month is 0-based
<HvDatePicker value="2026-10-16" />
```
