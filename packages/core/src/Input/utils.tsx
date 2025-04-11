/** Changes a given `input`'s `value`, triggering its `onChange` */
export const changeInputValue = (
  input: HTMLInputElement | null,
  value = "",
) => {
  const event = new Event("input", { bubbles: true });

  /** Original `input.value` setter (React overrides it). */
  const setInputValue = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  )?.set;

  setInputValue?.call(input, value);
  input?.dispatchEvent(event);
};
