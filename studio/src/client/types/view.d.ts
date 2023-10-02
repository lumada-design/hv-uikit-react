type ViewsStore = ViewsState & ViewsActions;

interface ViewsState {
  views: View[];
  selectedView?: string | undefined;
}

interface ViewsActions {
  addView: (view: View) => void;
  setViews: (views: View[]) => void;
  setSelectedView: (view: string) => void;
  addComponent: (component: Component) => void;
  removeComponent: (id: string) => void;
}

interface View {
  id: string;
  label: string;
  layout?: Component[];
}
