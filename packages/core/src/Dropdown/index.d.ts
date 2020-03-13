declare module '@hv/uikit-react-core/dist/Dropdown' {
  class HvDropdown extends React.Component<HvDropdownProps> {}

  export default HvDropdown

  export interface HvDropdownProps extends React.HTMLAttributes<HvDropdown> {
    /**
     * Class names to be applied.
     */
    className?: string
    /**
     * Id to be applied to the root node.
     */
    id?: string
    /**
     * A Jss Object used to override or extend the component styles applied.
     */
    classes?: {
      /**
       * Styles applied to the component root class.
       */
      root?: string
      /**
       * Styles applied to the component when is open.
       */
      rootActive?: string
      /**
       * Styles applied to the component when is disable.
       */
      rootDisabled?: string
      /**
       * Styles applied to the label.
       */
      label?: string
      /**
       * Styles applied to the header.
       */
      header?: string
      /**
       * Styles applied to the selection
       */
      selection?: string
      /**
       * Styles applied to the arrow
       */
      arrow?: string
      /**
       * Styles applied when the header is disable.
       */
      headerDisabled?: string
      /**
       * Styles applied to the icon.
       */
      icon?: string
      /**
       * Styles applied for truncating the list elements.
       */
      truncate?: string
      /**
       * Styles applied when the selection is disabled.
       */
      selectionDisabled?: string
    }
    /**
     * Label to display
     * @deprecated Instead use the labels property
     */
    label?: string
    /**
     * The list to be rendered by the dropdown.
     */
    // needed to disable eslint because:
    // https://github.com/yannickcr/eslint-plugin-react/issues/1751
    // https://github.com/yannickcr/eslint-plugin-react/issues/2028
    // eslint-disable-next-line react/no-unused-prop-types
    values?: {
      id?: string
      label: string
      selected?: boolean
    }[]
    /**
     * If ´true´ the dropdown is multiselect, if ´false´ the dropdown is single select.
     */
    multiSelect?: boolean
    /**
     * If ´true´ the dropdown is rendered with a search bar, if ´false´ there won't be a search bar.
     */
    showSearch?: boolean
    /**
     * If ´true´ the dropdown is disabled unable to be interacted, if ´false´ it is enabled.
     */
    disabled?: boolean
    /**
     * If ´true´ the dropdown starts opened if ´false´ it starts closed.
     */
    // needed to disable eslint because:
    // https://github.com/yannickcr/eslint-plugin-react/issues/1751
    // https://github.com/yannickcr/eslint-plugin-react/issues/2028
    // eslint-disable-next-line react/no-unused-prop-types
    expanded?: boolean
    /**
     * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
     */
    onChange?: (...args: any[]) => any
    /**
     * If 'true' the dropdown will notify on the first render.
     */
    notifyChangesOnFirstRender?: boolean
    /**
     * An object containing all the labels for the dropdown.
     *
     * - title: Label title for the dropdown.
     * - select: The default when there are no options available.
     * - selectAll: The label used for the All checkbox action.
     * - cancelLabel: The label used for the cancel button.
     * - applyLabel: The label used for the apply button.
     * - multiSelectionAction: The label used preceding the multiselection count.
     * - multiSelectionConjunction: The label used in the middle of the multiselection count.
     */
    labels?: {
      title?: string
      select?: string
      selectAll?: string
      cancelLabel?: string
      applyLabel?: string
      multiSelectionAction?: string
      multiSelectionConjunction?: string
    }
    /**
     * If ´true´ and none element selected,
     * single select has default (first) label selected.
     */
    selectDefault?: boolean
    /**
     * The theme passed by the provider.
     */
    theme?: object
    /**
     * If ´true´ the dropdown will show tooltips when user mouseenter text in list
     */
    hasTooltips?: boolean
    /**
     * Disable the portal behavior.
     * The children stay within it's parent DOM hierarchy.
     */
    disablePortal?: boolean
    /**
     * If ´true´, selection can be toggled when single selection.
     */
    singleSelectionToggle?: boolean
  }
}
