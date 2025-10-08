# @hitachivantara/uikit-react-code-editor

React Monaco editor wrapper with Hitachi Vantara Design System styles.

## Installation

```sh
npm install @hitachivantara/uikit-react-code-editor
```

## Usage

```jsx
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";

<HvCodeEditor
  language="javascript"
  defaultValue="console.log('Hello, World!');"
/>
```

## Offline Mode

By default, Monaco Editor loads from CDN. For offline support with bundled monaco-editor workers:

```jsx
<HvCodeEditor offlineMode />
```

**Vite Configuration Required:**

```js
// vite.config.js
export default {
  optimizeDeps: {
    exclude: ['monaco-editor'], // Prevents Vite from breaking worker imports
  },
}
```

**Note:** Offline mode only works with Vite.

## Documentation

See [Monaco Editor for React](https://github.com/suren-atoyan/monaco-react) for additional options.
