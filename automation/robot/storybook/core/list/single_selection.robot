*** Setting ***
Variables        variables.yaml
Resource         ../_keywords.resource
Documentation    options selections just for lists with single selection
Force Tags    v3


*** Test Cases ***
remove a selected option when click on it (single selection list)
    Go To                                ${patterns}list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}
    Element Attribute Value Should Be    ${option3}          aria-selected    true
    Click Element                        ${option3}
    Element Attribute Value Should Be    ${option3}          aria-selected    ${None}
    Page Should Not Contain Element      ${selectedItems}

change selected option when click on other option (single selection list)
    Go To                                ${patterns}list--single-selection-with-icon
    Wait Until Element Is Visible        ${list}
    Element Attribute Value Should Be    ${option3}    aria-selected    true
    Element Attribute Value Should Be    ${option2}    aria-selected    ${None}
    Click Element                        ${option2}
    Element Attribute Value Should Be    ${option3}    aria-selected    ${None}
    Element Attribute Value Should Be    ${option2}    aria-selected    true

unable to select disabled option when click on it
    Go To                                  ${patterns}list--single-selection-with-icon
    Wait Until Element Is Visible          ${list}
    Element Attribute Value Should Be      ${option4}       aria-selected    ${None}
    Run Keyword And Continue On Failure    Click Element    ${option4}
    Element Attribute Value Should Be      ${option4}       aria-selected    ${None}

unable to select disabled option when all list options are disabled
    Go To                                ${patterns}list--main
    Wait Until Element Is Visible        ${menubar}
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    aria-selected    ${None}
    Click Element                        ${option5}
    Element Attribute Value Should Be    ${option5}    aria-selected    ${None}

verify menu options have correct option attributed when is a menu list
    Go To                                ${patterns}list--main
    Wait Until Element Is Visible        ${menubar}
    Click Element                        ${option1}
    Element Attribute Value Should Be    ${option1}    role    menuitem
    Click Element                        ${option5}
    Element Attribute Value Should Be    ${option5}    role    menuitem
