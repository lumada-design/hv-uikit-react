export const editorConfig: EditorState = {
  leftPanel: {
    label: "Left Panel",
    selected: "views",
    pined: true,
    panels: [
      {
        id: "views",
        label: "Views",
        icon: "Doc",
        panel: "Views",
      },
      {
        id: "components",
        label: "Components",
        icon: "Components",
        panel: "Components",
      },
      {
        id: "sections",
        label: "Sections",
        icon: "Column",
        panel: "Sections",
      },
      {
        id: "templates",
        label: "Templates",
        icon: "Template",
        panel: "Templates",
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
