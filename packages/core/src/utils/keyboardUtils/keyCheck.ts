/**
 *  Check whether the key code is an enter.
 *
 *  @param {Object} event - The event object to extract the number from.
 *  @returns {Number | undefined} - The corresponding number or undefined if it does not exist.
 */
export const getKeyCodeFromEvent = (event) =>
  event ? event.keyCode : undefined;

/**
 *  Check whether the key code is an enter.
 *
 *  @param {Number} number - The number to make the comparison.
 *  @param {Number} keycode - The number to check.
 *  @returns - `true` if the keycode is not enter, `false` if the keycode is correspond to enter or undefined.
 */
export const isKeycode = (number, keyCode) =>
  number === null || number === undefined ? undefined : number === keyCode;

/**
 *  Check whether the key code is an enter.
 *
 *  @param {Object} event - The event object to extract the number from.
 *  @param {Number} keycode - The number to check.
 *  @returns - `true` if the keycode is the corresponding key, `false` if the keycode is corresponding key or undefined if the event does not exist or is not a keypress.
 */
export const isKeypress = (event, keyCode) =>
  isKeycode(getKeyCodeFromEvent(event), keyCode);
