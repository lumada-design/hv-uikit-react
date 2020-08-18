*** Setting ***
Resource    ../_keywords.resource
Force Tags  v3


*** Variables ***
${input}                    check-label-input
${inputUnchecked}           checkState1-input
${inputIndeterm}            checkState3-input
${inputIndetermDisabled}    checkState4-input
${inputDisabled}            checkState5-input
${inputDisabledChecked}     checkState6-input


*** Test Cases ***
select and unselect a checkbox with label
    Go To                              ${patterns}selectors-checkbox--with-label
    Wait Until Element Is Enabled      ${input}
    Checkbox Should Not Be Selected    ${input}
    Select Checkbox                    ${input}
    Checkbox Should Be Selected        ${input}
    Unselect Checkbox                  ${input}
    Checkbox Should Not Be Selected    ${input}
    Element Should Be Visible          //span[text()='Label']

unable select checkbox when is disabled
    Go To                               ${patterns}selectors-checkbox--with-state
    Wait Until Page Contains Element    ${inputDisabled}
    Element Should Be Disabled          ${inputDisabled}
    Run Keyword And Ignore Error        Click Element       ${inputDisabled}
    Checkbox Should Not Be Selected     ${inputDisabled}
    Element Should Be Disabled          ${inputDisabled}

unable unselect checkbox when is disabled
    Go To                               ${patterns}selectors-checkbox--with-state
    Wait Until Page Contains Element    ${inputDisabledChecked}
    Run Keyword And Ignore Error        Click Element               ${inputDisabledChecked}
    Element Should Be Disabled          ${inputDisabledChecked}
    Checkbox Should Be Selected         ${inputDisabledChecked}

toggle indeterminate checkbox
    Go To                               ${patterns}selectors-checkbox--with-state
    Wait Until Element Is Enabled       ${inputIndeterm}
    Checkbox Should Not Be Selected     ${inputIndeterm}
    Element Attribute Value Should Be   ${inputIndeterm}    data-indeterminate  false
    Click Element                       ${inputIndeterm}
    Element Attribute Value Should Be   ${inputIndeterm}    data-indeterminate  true
    Checkbox Should Be Selected         ${inputIndeterm}

unable toggle disabled indeterminate checkbox
    Go To                               ${patterns}selectors-checkbox--with-state
    Wait Until Page Contains Element    ${inputIndetermDisabled}
    Element Attribute Value Should Be   ${inputIndetermDisabled}    data-indeterminate  true
    Run Keyword And Ignore Error        Click Element               ${inputIndetermDisabled}
    Element Attribute Value Should Be   ${inputIndetermDisabled}    data-indeterminate  true
