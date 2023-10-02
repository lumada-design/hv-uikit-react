type EditorStore = EditorState & EditorActions;

type CanvasMode = "desktop" | "mobile";

interface EditorState {
  leftPanel: LeftPanel;
  canvas: Canvas;
  rightPanel: RightPanel;
  components: Component[];
}

interface EditorActions {
  setLeftPanelSelected: (panel?: string) => void;
  setLeftPanelPinned: (pined?: boolean) => void;
  setCanvasMode: (mode: CanvasMode) => void;
}

interface LeftPanel {
  label: string;
  selected?: string;
  panels: Panel[];
  pined?: boolean;
}

interface Canvas {
  label: string;
  mode: CanvasMode;
}

interface RightPanel {
  label: string;
}

interface Panel {
  id: string;
  label: string;
  icon: string;
  panel: string;
}

interface Component {
  id?: UniqueIdentifier;
  parent?: string;
  type: string;
  label: string;
  src: string;
}
