export function getDocument() {
  return typeof window !== "undefined" ? document : undefined;
}

/** Wrapper around `document.getElementById` */
export function getElementById(elementId?: string) {
  return (elementId && getDocument()?.getElementById(elementId)) || undefined;
}

/** Get a container element by id, falling back to document-body */
export function getContainerElement(elementId?: string) {
  return getElementById(elementId) || getDocument()?.body;
}
