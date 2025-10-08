import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import {
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvIconButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import {
  Duplicate,
  Fullscreen,
  PopUp,
} from "@hitachivantara/uikit-react-icons";

import { configureMonacoOffline } from "../monaco-config";

const styles = {
  actionsContainer: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    height: 50,
    border: `1px solid ${theme.colors.border}`,
    borderBottom: "none",
    background: theme.colors.bgContainer,
    padding: theme.space.xs,
  }),
};

const DEFAULT_JSON = `{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": ["GML", "XML"]
          },
          "GlossSee": "markup"
        }
      }
    }
  }
}`;

interface HeaderProps {
  title: string;
  onFullscreen: () => void;
  onDuplicate?: () => void;
  onOpenNewWindow?: () => void;
}

const Header = ({
  title,
  onFullscreen,
  onDuplicate,
  onOpenNewWindow,
}: HeaderProps) => (
  <div className={styles.header}>
    <div className={styles.actionsContainer}>
      <HvTypography component="div" variant="label">
        {title}
      </HvTypography>
      {onOpenNewWindow && (
        <HvIconButton
          title="Open in new window"
          component="a"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOpenNewWindow}
        >
          <PopUp />
        </HvIconButton>
      )}
    </div>
    <div className={styles.actionsContainer}>
      <HvIconButton title="Fullscreen" onClick={onFullscreen}>
        <Fullscreen />
      </HvIconButton>
      {onDuplicate && (
        <HvIconButton title="Duplicate" onClick={onDuplicate}>
          <Duplicate />
        </HvIconButton>
      )}
    </div>
  </div>
);

interface BaseEditorProps {
  title?: string;
  initialContent?: string;
  language?: string;
  height?: number;
  fullscreenHeight?: number;
  isReady?: boolean;
  loadingMessage?: string;
  onChange?: (content: string) => void;
  onDuplicate?: () => void;
  onOpenNewWindow?: () => void;
}

const BaseEditor = ({
  title = "file.json",
  initialContent = DEFAULT_JSON,
  language = "json",
  height = 420,
  fullscreenHeight = 500,
  isReady = true,
  loadingMessage = "Loading...",
  onChange,
  onDuplicate,
  onOpenNewWindow,
}: BaseEditorProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleChange = (value: string | undefined) => {
    const newContent = value || "";
    setContent(newContent);
    onChange?.(newContent);
  };

  const renderEditor = (editorHeight: number) => (
    <HvCodeEditor
      height={editorHeight}
      language={language}
      onChange={handleChange}
      value={content}
    />
  );

  if (!isReady) {
    return <HvTypography variant="body">{loadingMessage}</HvTypography>;
  }

  return (
    <>
      <Header
        title={title}
        onFullscreen={() => setIsFullscreen(true)}
        onDuplicate={onDuplicate}
        onOpenNewWindow={onOpenNewWindow}
      />
      {renderEditor(height)}
      <HvDialog
        fullWidth
        maxWidth="xl"
        open={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      >
        <HvDialogTitle>Fullscreen</HvDialogTitle>
        <HvDialogContent>{renderEditor(fullscreenHeight)}</HvDialogContent>
      </HvDialog>
    </>
  );
};

export const MainStory = () => (
  <BaseEditor
    onOpenNewWindow={() => window.open(window.location.href, "_blank")}
  />
);

export const OfflineStory = () => {
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    configureMonacoOffline().finally(() => setIsConfigured(true));
  }, []);

  return (
    <BaseEditor
      title="offline-file.json"
      isReady={isConfigured}
      loadingMessage="Configuring Monaco Editor..."
      onOpenNewWindow={() => window.open(window.location.href, "_blank")}
    />
  );
};
