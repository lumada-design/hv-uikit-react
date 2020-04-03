declare module '@hv/uikit-react-core/dist/Typography' {
  import React from 'react'

  class HvTypography extends React.Component<HvTypographyProps, any> {}

  export default HvTypography

  export interface HvTypographyProps
    extends React.HTMLAttributes<HvTypography> {
    /**
     * Styles applied to the Drawer Paper element.
     */
    classes?: Object

    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * By default, it maps the variant to a good default headline component.
     */
    component?: React.ReactElement

    /**
     * If `true`, the text will have a bottom margin.
     */
    paragraph?: boolean

    /**
     * The selected Typography.
     */
    variant?:
      | '5xlTitle'
      | '4xlTitle'
      | '3xlTitle'
      | 'xxlTitle'
      | 'xlTitle'
      | 'lTitle'
      | 'mTitle'
      | 'sTitle'
      | 'xsTitle'
      | 'xxsTitle'
      | 'highlightText'
      | 'normalText'
      | 'selectedText'
      | 'disabledButtonText'
      | 'placeholderText'
      | 'inlineLink'
      | 'selectedNavText'
      | 'labelText'
      | 'infoText'
      | 'sLink'
      | 'sText'
      | 'vizText'
      | 'disabledText'
  }
}
