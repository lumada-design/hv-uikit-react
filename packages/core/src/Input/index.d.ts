declare module '@hv/uikit-react-core/dist/Input' {
  import React from 'react'
  
  class HvInput extends React.Component<HvInputProps, any> {}

  export default HvInput

  export interface InputTextConfiguration {
    inputLabel?: string
    placeholder?: string
    infoText?: string
    warningText?: string
    maxCharQuantityWarningText?: string
    minCharQuantityWarningText?: string
    requiredWarningText?: string
  }

  export interface InputLabels {
    inputLabel?: string
    placeholder?: string
    infoText?: string
    warningText?: string
    maxCharQuantityWarningText?: string
    minCharQuantityWarningText?: string
    requiredWarningText?: string
  }

  export interface HvInputProps extends React.HTMLAttributes<HvInput> {
    /**
     * A Jss Object used to override or extend the component styles applied.
     */
    classes?: {
      /**
       * Styles applied to the container of the input.
       */
      container?: string
      /**
       * Styles applied to input root which is comprising of everything but the labels and descriptions.
       */
      inputRoot?: string
      /**
       * Styles applied to input root when it is disabled.
       */
      inputRootDisabled?: string
      /**
       * Styles applied to input root when it is focused.
       */
      inputRootFocused?: string
      /**
       * Styles applied to input html element.
       */
      input?: string
      /**
       * Styles applied to input html element when it is disabled.
       */
      inputDisabled?: string
      /**
       * Styles applied to input html element when it is multiline mode.
       */
      multiLine?: string
      /**
       * Styles applied to the label element.
       */
      label?: string
      /**
       * Styles applied to the container of the labels elements.
       */
      labelContainer?: string
      /**
       * Styles applied to the icon information container.
       */
      infoIconContainer?: string
      /**
       * Styles applied to the description.
       */
      text?: string
      /**
       * Styles applied to the description when it is showing an information.
       */
      textInfo?: string
      /**
       * Styles applied to the description when it is showing a warning.
       */
      textWarning?: string
      /**
       * Styles applied to the icon.
       */
      icon?: string
      /**
       * Styles applied to the container of the icon.
       */
      iconContainer?: string
      /**
       * Styles applied to the icon used to clean the input.
       */
      iconClear?: string
      /**
       * IE11 specific styling.
       */
      '@global'?: string
    }

    /**
     * An Object containing the various text associated with the input.
     *
     * - inputLabel: the label on top of the input.
     * - placeholder: the placeholder value of the input.
     * - infoText: the default value of the info text below the input.
     * - warningText: the value when a validation fails.
     * - maxCharQuantityWarningText: the message that appears when there are too many characters.
     * - minCharQuantityWarningText: the message that appears when there are too few characters.
     * - requiredWarningText: the message that appears when the input is empty and required.
     * @deprecated Instead use the labels property
     */
    inputTextConfiguration?: InputTextConfiguration

    /**
     * An Object containing the various text associated with the input.
     *
     * - inputLabel: the label on top of the input.
     * - placeholder: the placeholder value of the input.
     * - infoText: the default value of the info text below the input.
     * - warningText: the value when a validation fails.
     * - maxCharQuantityWarningText: the message that appears when there are too many characters.
     * - minCharQuantityWarningText: the message that appears when there are too few characters.
     * - requiredWarningText: the message that appears when the input is empty and required.
     */
    labels?: InputLabels

    /**
     * Attributes applied to the input element.
     */
    inputProps?: any

    /**
     * If ´true´ the input is disabled.
     */
    disabled?: boolean

    /**
     * If ´true´ the input value must be filled on blur or else the validation fails.
     */
    isRequired?: boolean

    /**
     * If ´true´ the input is of type password hiding the value.
     */
    password?: boolean

    /**
     * The function that will be executed onChange, allows modification of the input,
     * it receives the value. If a new value should be presented it must returned it.
     */
    onChange?: (...args: any[]) => any

    /**
     * The function that will be executed onBlur, allows checking the validation state,
     * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
     */
    onBlur?: (...args: any[]) => any

    /**
     * The function that will be executed onBlur, allows checking the value state,
     * it receives the value.
     */
    onFocus?: (...args: any[]) => any

    /**
     * The function that will be executed onKeyDown, allows checking the value state,
     * it receives the event and value.
     */
    onKeyDown?: (...args: any[]) => any

    /**
     * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
     */
    suggestionListCallback?: (...args: any[]) => any

    /**
     * The function that will be executed after selecting a value in the suggestion list
     */
    suggestionSelectedCallback?: (...args: any[]) => any

    /**
     * If `true` validation is shown, `false` otherwise.
     *  * @deprecated Instead use the showInfo property
     */
    validate?: boolean

    /**
     * If `true` information label is shown, `false` otherwise.
     */
    showInfo?: boolean

    /**
     * The custom validation function, it receives the value and must return
     * either ´true´ for valid or ´false´ for invalid, default validations would only
     * occur if this function is null or undefined
     */
    validation?: (...args: any[]) => any

    /**
     * The initial value of the input.
     * @deprecated Instead use the initialValue property
     */
    value?: string

    /**
     * The initial value of the input.
     */
    initialValue?: string

    /**
     * The input value to be set. If used it is the responsibility of the caller to maintain the state.
     * @deprecated will be replaced by value
     */
    inputValue?: string

    /**
     * If `true` it should autofocus.
     */
    autoFocus?: boolean

    /**
     * The initial state of the input.
     *
     * note: Is recommended you use the provided validationStates object to set this value.
     */
    validationState?: 'empty' | 'filled' | 'invalid' | 'valid'

    /**
     * Show info icon with info label.infoText.
     */
    infoIcon?: boolean

    /**
     * If `true` the icon is visible, `false` otherwise
     * @deprecated Instead use the validationIconVisible property
     */
    iconVisible?: boolean

    /**
     * If `true` the validation icon is visible, `false` otherwise
     */
    validationIconVisible?: boolean

    /**
     * If `true` the clear button is disabled if `false` is enable
     */
    disableClear?: boolean

    /**
     * The icon position of the input. It is recommended to use the provided iconPositions object to set this value.
     * @deprecated Instead use the validationIconPosition property
     */
    iconPosition?: 'left' | 'right'

    /**
     * The icon position of the input. It is recommended to use the provided validationIconPosition object to set this value.
     */
    validationIconPosition?: 'left' | 'right'

    /**
     * a custom icon to be added into the input.
     */
    customFixedIcon?: React.ReactNode

    /**
     * The maximum allowed length of the characters, if this value is null no check
     * will be performed.
     */
    maxCharQuantity?: number

    /**
     * The minimum allowed length of the characters, if this value is null no check
     * will be perform.
     */
    minCharQuantity?: number

    /**
     * Which type of default validation should the input perform. It is recommended to use the provided ValidationTypes object to set this value.
     */
    validationType?: 'none' | 'number' | 'email'

    /**
     * Overrides any validation with a specific error/warning message to set in the infoText slot.
     */
    externalWarningTextOverride?: string

    /**
     * The theme passed by the provider.
     */
    theme?: any
  }
}
