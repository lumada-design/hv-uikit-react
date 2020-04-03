declare module '@hv/uikit-react-lab/dist/Loading' {
  import React from 'react'
  
  class HvLoading extends React.Component<HvLoadingProps, any> {}

  export default HvLoading

  export interface HvLoadingProps extends React.HTMLAttributes<HvLoading> {
    /**
     *  Styles applied to the Drawer Paper element.
     */
    classes?: {
      /**
       * The class applied on the text area input box.
       */
      input?: string

      /**
       * The class applied on the character counter.
       */
      characterCounter?: string

      /**
       * The class controlling the layout of the counter.
       */
      inline?: string

      /**
       * The class applied to the separator element of the character counter.
       */
      separator?: string

      /**
       * The class applied to the max counter element of the character counter.
       */
      maxCharacter?: string

      /**
       * The class applied to the current counter element of the character counter.
       */
      currentCounter?: string

      /**
       * The class applied to the character counter when it is disabled.
       */
      disabled?: string
    }

    /**
     * The size of the loading indicator.
     */
    size?: 'regular' | 'small'

    /**
     * The position where the loading indicator is to be positioned in,
     * center of the page or inline in the container where its inserted.
     */
    position?: 'center' | 'inline'

    /**
     * The text to be displayed.
     */
    text?: string
  }
}
