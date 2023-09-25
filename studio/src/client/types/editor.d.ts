interface Panel {
  id: string;
  label: string;
  icon: string;
  component: string;
}

interface LeftPanel {
  label: string;
  selected?: string;
  panels: Panel[];
  pined?: boolean;
}

interface Canvas {
  label: string;
  mode?: "desktop" | "mobile";
}

interface RightPanel {
  label: string;
}

interface EditorState {
  leftPanel: LeftPanel;
  canvas: Canvas;
  rightPanel: RightPanel;
}

interface EditorStore extends EditorState {
  setLeftPanelSelected: (panel?: string) => void;
  setLeftPanelPinned: (pined?: boolean) => void;
  setCanvasMode: (mode?: string) => void;
}

interface FieldProps {
  id: string;
  type: string;
  name: string;
  parent: string | undefined;
}
