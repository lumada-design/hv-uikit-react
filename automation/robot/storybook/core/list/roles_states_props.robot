*** Setting ***
Resource         _list.resource
Test Setup       open list sample    single-selection-with-icon
Documentation    https://www.w3.org/TR/wai-aria-practices/#listbox_roles_states_props
Force Tags       wai-aria-practices


*** Test Cases ***
list has role listbox
    Element Attribute Value Should Be    ${list}    role    listbox

each option in the listbox has role option
    Element Attribute Value Should Be    ${option}(1)    role    option

list has aria-labelledby
    Element Attribute Value Should Be    ${list}
    ...    aria-label    Single Selection List with Left Icons Title

single select listbox has aria-selected true
    Element Attribute Value Should Be    ${option}(3)    aria-selected    true

multiple selection listbox has role aria-multiselectable set to true
    [Setup]    open list sample    multi-selection-with-select-all
    Element Attribute Value Should Be    ${list}    aria-multiselectable    true

multiple selection listbox has all selected options with aria-selected set to true
    [Setup]    open list sample    multi-selection-with-select-all
    Click Element                        ${option}(1)
    Click Element                        ${option}(2)
    Element Attribute Value Should Be    ${option}(1)    aria-selected    true
    Element Attribute Value Should Be    ${option}(2)    aria-selected    true
    Element Attribute Value Should Be    ${option}(3)    aria-selected    true

multiple selection listbox has all not selected options with aria-selected set to false
    [Setup]    open list sample    multi-selection-with-select-all
    Click Element                        ${option}(1)
    Element Attribute Value Should Be    ${option}(1)    aria-selected    true
    Element Attribute Value Should Be    ${option}(2)    aria-selected    false
    Element Attribute Value Should Be    ${option}(3)    aria-selected    true
    Element Attribute Value Should Be    ${option}(4)    aria-selected    false
    Element Attribute Value Should Be    ${option}(5)    aria-selected    false


*** Comments ***
https://www.w3.org/TR/wai-aria-practices/#listbox_roles_states_props
Documentation parts not applied by UIKIT team:
- Each option in the listbox has role option and is a DOM descendant of the element
  with role listbox or is referenced by an aria-owns property on the listbox element.
- If the complete set of available options is not present in the DOM due to dynamic
  loading as the user scrolls, their aria-setsize and aria-posinset attributes are set
  appropriately.
- If options are arranged horizontally, the element with role listbox has aria-orientation
  set to horizontal. The default value of aria-orientation for listbox is vertical.
