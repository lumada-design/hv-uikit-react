export const editorComponents: Component[] = [
  {
    label: "Text Input",
    type: "component",
    src: '<input type="text" placeholder = "This is a text input" />',
  },
  {
    label: "Select",
    type: "component",
    src: `
      <select>
      <option value= "1" > 1 < /option>
      < option value="2" > 2 < /option>
      < option value="3" > 3 < /option>
      < /select>
    `,
  },
  {
    label: "Text",
    type: "component",
    src: `
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
unchanged.It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
Ipsum.
      < /p>`,
  },
  {
    label: "Button",
    type: "component",
    src: `<button>Button < /button>`,
  },
  {
    label: "Text Area",
    type: "component",
    src: `<textarea rows={ 5 } />`,
  },
  {
    label: "Section 1",
    type: "section",
    src: `<div>section 1</div>`,
  },
  {
    label: "Section 2",
    type: "section",
    src: `<div>section 2</div>`,
  },
  {
    label: "Section 3",
    type: "section",
    src: `<div>section 3</div>`,
  },
];
