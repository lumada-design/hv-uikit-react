*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     options selections just for lists with single selection


*** Test Cases ***
list option change background when mouse hover on option
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}             10s
    verify element background-color change on mouse over and mouse out    ${option1}
    verify element background-color change on mouse over and mouse out    ${option2}

remove a selected option when click on it (single selection list)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}             10s
    Element Attribute Value Should Be    ${option3}          aria-selected    true
    Click Element                        ${option3}
    Element Attribute Value Should Be    ${option3}          aria-selected    ${None}
    Page Should Not Contain Element      ${selectedItems}

change selected option when click on other option (single selection list)
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Element Attribute Value Should Be    ${option2}    aria-selected    ${None}
    Click Element                        ${option2}
    Element Attribute Value Should Be    ${option3}    aria-selected    ${None}
    Element Attribute Value Should Be    ${option2}    aria-selected    true

unable to select disabled option when click on it
    Go To                                  ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible          ${list}          10s
    Element Attribute Value Should Be      ${option4}       aria-selected    ${None}
    Run Keyword And Continue On Failure    Click Element    ${option4}
    Element Attribute Value Should Be      ${option4}       aria-selected    ${None}

verify option label truncated with ... when option label string is too long
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible        ${list}       10s
    verify css element property value    ${option5}    text-overflow    clip

unable to select disabled option when all list options are disabled
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--list-notselectable
    Wait Until Element Is Visible        ${menubar}       10s
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    aria-selected    ${None}
    Click Element                        ${option5}
    Element Attribute Value Should Be    ${option5}    aria-selected    ${None}

verify menu options have correct option attributed when is a menu list 
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--list-notselectable
    Wait Until Element Is Visible        ${menubar}       10s
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    role    menuitem
    Click Element                        ${option5}
    Element Attribute Value Should Be    ${option5}    role    menuitem
