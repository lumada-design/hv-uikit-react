# @hitachivantara/uikit-react-code-editor

A wrapper to the React Monaco editor (https://github.com/suren-atoyan/monaco-react) using the Hitachi Vantara's Design System styles.

## Installation

Install the package in your project directory with:

```sh
npm install @hitachivantara/uikit-react-code-editor
```

## Getting Started

Additional configuration information can be found here: [Monaco Editor for React](https://github.com/suren-atoyan/monaco-react).

## Offline Support

Enable offline mode with a simple prop:

```bash
npm install monaco-editor  # Required for offline mode
```

```tsx
<HvCodeEditor offline language="xml" />
```

- **Zero bundle impact** when `offline={false}` (default)
- **Full offline support** in Vite environments
- **Graceful CDN fallback** in other bundlers

### Configuration Options

**Boolean Prop (Recommended):**

```tsx
<HvCodeEditor offline language="xml" />    // Offline
<HvCodeEditor offline={false} language="json" />   // CDN (default)
```

**Function Configuration:**

```tsx
import { configureMonacoOffline } from "@hitachivantara/uikit-react-code-editor";

configureMonacoOffline(); // App-wide configuration
```
