*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke    keyboard
Documentation     https://www.w3.org/TR/wai-aria-practices/#Listbox


*** Test Cases ***
select an option when pressing ENTER on it (single selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option5}    aria-selected    ${None}
    Set Focus To Element                 ${option5}
    Press Keys                           ${None}       ENTER
    Element Attribute Value Should Be    ${option5}    aria-selected    true

unselect an option when pressing ENTER on selected option (single selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Set Focus To Element                 ${option3}
    Press Keys                           ${None}       ENTER
    Element Attribute Value Should Be    ${option3}    aria-selected    ${None}

select an option when pressing SPACE on it (single selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option5}    aria-selected    ${None}
    Set Focus To Element                 ${option5}
    Press Keys                           ${None}       SPACE
    Element Attribute Value Should Be    ${option5}    aria-selected    true

unselect an option when pressing SPACE on selected option (single selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Set Focus To Element                 ${option3}
    Press Keys                           ${None}       SPACE
    Element Attribute Value Should Be    ${option3}    aria-selected    ${None}

select an option when pressing SPACE on it (multiple selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option5}    aria-selected    false
    Set Focus To Element                 ${option5}
    Press Keys                           ${None}       SPACE
    Element Attribute Value Should Be    ${option5}    aria-selected    true

unselect an option when pressing SPACE on selected option (multiple selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Set Focus To Element                 ${option3}
    Press Keys                           ${None}       SPACE
    Element Attribute Value Should Be    ${option3}    aria-selected    false

don't selected option when pressing ENTER on it (multiple selection)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option5}    aria-selected    false
    Set Focus To Element                 ${option5}
    Press Keys                           ${None}       ENTER
    Element Attribute Value Should Be    ${option5}    aria-selected    false
