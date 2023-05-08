const editorState: EditorState = {
  leftPanel: {
    label: "Left Panel",
    selected: "pages",
    pined: true,
    panels: [
      {
        id: "pages",
        label: "Pages",
        icon: "Doc",
        component: "PanelPages",
      },
      {
        id: "components",
        label: "Components",
        icon: "Components",
        component: "PanelComponents",
      },
      {
        id: "sections",
        label: "Sections",
        icon: "Column",
        component: "PanelSections",
      },
      {
        id: "templates",
        label: "Templates",
        icon: "Template",
        component: "PanelTemplates",
      },
    ],
  },
  canvas: {
    label: "Canvas",
    mode: "desktop",
  },
  rightPanel: {
    label: "Right Panel",
  },
};

export default editorState;
