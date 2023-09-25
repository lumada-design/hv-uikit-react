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
        component: "Pages",
      },
      {
        id: "components",
        label: "Components",
        icon: "Components",
        component: "Components",
      },
      {
        id: "sections",
        label: "Sections",
        icon: "Column",
        component: "Sections",
      },
      {
        id: "templates",
        label: "Templates",
        icon: "Template",
        component: "Templates",
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
