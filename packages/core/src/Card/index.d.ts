declare module '@hv/uikit-react-core/dist/Card' {
  import React from 'react'
  import { Semantic } from '@hv/uikit-react-icons/dist'

  class HvCard extends React.Component<HvCardProps, any> {}

  export default HvCard

  export interface CardAction {
    id: string
    label: string
    icon: (...args: any[]) => any
  }

  export interface HvCardProps extends React.HTMLAttributes<HvCard> {
    /**
     *  Used to define a string that labels the current element.
     */
    defaultCardAriaLabel?: string

    /**
     *  Establishes relationships between objects and their label(s), and its value should be one or more element IDs.
     */
    defaultCardAriaLabelledBy?: string

    /**
     *  Used to indicate the IDs of the elements that describe the object.
     */
    defaultCardAriaDescribedBy?: string

    /**
     * A Jss Object used to override or extend the styles applied.
     */
    classes?: {
      /**
       * Style applied to the border top.
       */
      borderTop?: string
    }

    /**
     *  The renderable content inside the title slot of the header.
     */
    headerTitle?: React.ReactNode

    /**
     *  The renderable content inside the subheader slot of the header.
     */
    subheader?: React.ReactNode

    /**
     *  The renderable content inside the icon slot of the header.
     */
    icon?: React.ReactNode

    /**
     * The renderable content inside the actions slot of the footer,
     * or an Array of actions ´{id, label, icon}´
     */
    actions?: React.ReactNode | CardAction[]

    /**
     *  The callback function ran when an action is triggered, receiving ´action´ as param
     */
    actionsCallback?: (...args: any[]) => any

    /**
     * The alignment applied to the action elements
     */
    actionsAlignment?: 'left' | 'right'

    /**
     *  The renderable content inside the body of the card.
     */
    innerCardContent?: React.ReactNode

    /**
     *  The path to the image to show in the media slot.
     */
    mediaPath?: string

    /**
     *  The title of the media.
     */
    mediaTitle?: string

    /**
     *  The height necessary to adjust the media container to the image.
     */
    mediaHeight?: number

    /**
     *  Used to define a string that labels the media element.
     */
    mediaAriaLabel?: string

    /**
     *  Establishes relationships between the media and it's label(s), its value should be one or more element IDs.
     */
    mediaAriaLabelledBy?: string

    /**
     *  Used to indicate the IDs of the elements that describe the media element.
     */
    mediaAriaDescribedBy?: string

    /**
     *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
     */
    semantic?: Semantic

    /**
     *  The function that will be executed when the upper part of the card is clicked.
     *  only works for the default card.
     */
    onClickAction?: (...args: any[]) => any

    /**
     *  Removes the header for the default card.
     */
    noHeader?: boolean

    /**
     *  Removes the footer for the default card.
     */
    noFooter?: boolean

    /**
     *  allows selecting on click action.
     *  only works for the default card.
     */
    selectOnClickAction?: boolean

    /**
     *  The function that will be executed when the card is selected.
     */
    onChange?: (...args: any[]) => any

    /**
     * ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
     */
    isSelectable?: boolean

    /**
     *  The value the checkbox in the footer will return when selected.
     */
    checkboxValue?: string

    /**
     *  The label for the checkbox in the footer of the card.
     */
    checkboxLabel?: string

    /**
     *  ´true´ if the checkbox is selected or ´false´ if not selected.
     *
     *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
     */
    checkboxSelected?: boolean

    /**
     *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
     */
    checkboxIndeterminate?: boolean

    /**
     *  Used to define a string that labels the checkbox element.
     */
    checkboxAriaLabel?: string

    /**
     *  Establishes relationships between checkbox and it's label(s), its value should be one or more element IDs.
     */
    checkboxAriaLabelledBy?: string

    /**
     *  Used to indicate the IDs of the elements that describe the checkbox.
     */
    checkboxAriaDescribedBy?: string

    /**
     * The theme passed by the provider.
     */
    theme?: any

    /**
     *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
     */
    maxVisibleActions?: number

    /**
     *  Width applicable to the action container, to handle an issue Safari has when using css flex:
     *  It resizes descendant divs, unless a width is forced
     **/
    actionItemWidth?: number
  }
}
