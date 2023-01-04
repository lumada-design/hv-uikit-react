import { CreateStyled } from "@emotion/styled";

/**
 * Prevent a prop from being forwarded to the DOM. This allows us to pass props to
 * our styled components without them being explicitly written in the DOM.
 *
 * Usage:
 *   export const StyledRoot = styled("div", transientOptions)(
 *    ({ $option }) => ({ ... })
 *   )
 *
 * source: https://github.com/emotion-js/emotion/issues/2193#issuecomment-766173118
 */
export const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
};
