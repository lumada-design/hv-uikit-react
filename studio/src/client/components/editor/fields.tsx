// These will be available from the sidebar
export const fields = [
    {
        type: "input",
        title: "Text Input"
    },
    {
        type: "select",
        title: "Select"
    },
    {
        type: "text",
        title: "Text"
    },
    {
        type: "button",
        title: "Button"
    },
    {
        type: "textarea",
        title: "Text Area"
    }
];

// These define how we render the field
export const renderers = {
    input: () => <input type="text" placeholder="This is a text input" />,
    textarea: () => <textarea rows="5" />,
    select: () => (
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
    ),
    text: () => (
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
        </p>
    ),
    button: () => <button>Button</button>
};
