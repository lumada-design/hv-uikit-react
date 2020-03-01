declare module '@hv/uikit-react-core/dist/SearchBox' {
  import React from 'react'
  
  class HvSearchBox extends React.Component<HvSearchBoxProps, any> {}

  export default HvSearchBox

  export interface SearchBoxLabel {
    inputLabel?: string
    placeholder?: string
  }

  export interface HvSearchBoxProps extends React.HTMLAttributes<HvSearchBox> {
    /**
     * The theme passed by the provider.
     */
    theme?: any

    /**
     * A Jss Object used to override or extend the styles applied to the search box.
     */
    classes?: {
      /**
       * Styles applied to searchbox root.
       */
      root?: string
    }

    /**
     * An Object containing the various text associated with the searchbox.
     *
     * - inputLabel: the label on top of the searchbox.
     * - placeholder: the placeholder value of the searchbox.
     */
    labels?: SearchBoxLabel

    /**
     * The initial value of the searchbox
     */
    value?: string

    /**
     * The function that will be executed when the searchbox changes,
     * it receives the searchbox value
     */
    onChange?: (...args: any[]) => any

    /**
     * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
     */
    suggestionListCallback?: (...ags: any[]) => any

    /**
     * The function that will be executed after selecting a value in the suggestion list
     */
    suggestionSelectedCallback?: (...args: any[]) => any

    /**
     * The function that will be executed onBlur, allows checking the validation state,
     * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
     */
    onBlur?: (...args: any[]) => any

    /**
     * The function that will be executed onFocus, allows checking the value state,
     * it receives the value.
     */
    onFocus?: (...args: any[]) => any

    /**
     * The function that will be executed onKeyDown, allows checking the value state,
     * it receives the value.
     */
    onKeyDown?: (...args: any[]) => any

    /**
     * The function that will be executed on Enter, allows checking the value state,
     * it receives the value.
     */
    onSubmit?: (...args: any[]) => any

    /**
     * If `true` it should autofocus.
     */
    autoFocus?: boolean

    /**
     * If ´true´ the searchBox is disabled.
     */
    disabled?: boolean

    /**
     * The initial value of the searchBox.
     */
    initialValue?: string
  }
}
