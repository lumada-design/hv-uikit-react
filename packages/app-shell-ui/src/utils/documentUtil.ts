const createAppContainerElement = (id?: string): HTMLElement => {
  const panelContainerId = "app-shell-panel-container";
  let panelContainerElement = document.getElementById(id ?? panelContainerId);

  if (!panelContainerElement) {
    panelContainerElement = document.createElement("div");
    panelContainerElement.id = panelContainerId;
    document.body.appendChild(panelContainerElement);
  }

  return panelContainerElement;
};

export default createAppContainerElement;
