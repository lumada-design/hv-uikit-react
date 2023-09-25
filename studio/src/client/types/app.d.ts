interface Page {
  id: string;
  label: string;
}

interface Pages {
  pages: Page[];
}

interface Component {
  id?: string;
  parent?: string;
  type: string;
  label: string;
  category?: string;
  src: string;
}

interface Components {
  components: Component[];
}

interface AppState {
  pages: Page[];
  selectedPage?: string | undefined;
  components: Component[];
  selectedComponent?: string | undefined;
}

interface AppStore extends AppState {
  addPage: (page: Page) => void;
  setPages: (pages: Page[]) => void;
  setSelectedPage: (page: string) => void;
  addComponent: (component: Component, parent: string) => void;
  setComponents: (components: Component[]) => void;
  removeComponent: (id: string) => void;
  setSelectedComponent: (id?: string) => void;
}
