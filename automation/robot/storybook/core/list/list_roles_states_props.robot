*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    wai-aria-practices
Documentation     https://www.w3.org/TR/wai-aria-practices/#listbox_roles_states_props
...    
...    doc parts not applied by UIKIT team: \n
...    - Each option in the listbox has role option and is a DOM descendant of the element with role listbox or is referenced by an aria-owns property on the listbox element.
...    - If the complete set of available options is not present in the DOM due to dynamic loading as the user scrolls, their aria-setsize and aria-posinset attributes are set appropriately. 
...    - If options are arranged horizontally, the element with role listbox has aria-orientation set to horizontal. The default value of aria-orientation for listbox is vertical. 


*** Test Cases ***
verify list has role listbox
    [Documentation]
    ...    - An element that contains or owns all the listbox options has role listbox.
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}    10s
    Element Attribute Value Should Be    ${list}    role    listbox

verify each option in the listbox has role option
    [Documentation]
    ...    - Each option in the listbox has role option...
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option1}    role    option

verify list has aria-labelledby
    [Documentation]
    ...    - If the listbox is not part of another widget, then it has a visible label referenced by aria-labelledby on the element with role listbox
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}    10s
    Element Attribute Value Should Be    ${list}    aria-label    Single Selection List with Left Icons Title

verify single select listbox has aria-selected true
    [Documentation]
    ...    - In a single-select listbox, the selected option has aria-selected set to true.
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option3}    aria-selected    true

verify multiple selection listbox has role aria-multiselectable set to true
    [Documentation]
    ...    - The element with role listbox has aria-multiselectable set to true.
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${list}    aria-multiselectable    true

verify multiple selection listbox has all selected options with aria-selected set to true
    [Documentation]
    ...    - All selected options have aria-selected set to true.
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible        ${list}       10s
    Click Element                        ${option1}
    Click Element                        ${option2}
    Element Attribute Value Should Be    ${option1}    aria-selected    true
    Element Attribute Value Should Be    ${option2}    aria-selected    true
    Element Attribute Value Should Be    ${option3}    aria-selected    true

verify multiple selection listbox has all not selected options with aria-selected set to false
    [Documentation]
    ...    - All options that are not selected have aria-selected set to false.
    ...
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--multi-selection-with-select-all
    Wait Until Element Is Visible        ${list}       10s
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    aria-selected    true
    Element Attribute Value Should Be    ${option2}    aria-selected    false
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Element Attribute Value Should Be    ${option4}    aria-selected    false
    Element Attribute Value Should Be    ${option5}    aria-selected    false
