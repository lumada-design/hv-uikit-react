*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke

*** Variables ***
${input}                    checkLabel-input
${inputUnchecked}           checkState1-input
${inputIndeterm}            checkState3-input
${inputIndetermDisabled}    checkState4-input
${inputDisabled}            checkState5-input
${inputDisabledChecked}     checkState6-input

*** Test Cases ***
select and unselect a checkbox with label
    Go To                              ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxlabel
    Wait Until Element Is Enabled      ${input}     10s
    Checkbox Should Not Be Selected    ${input}
    Select Checkbox                    ${input}
    Checkbox Should Be Selected        ${input}
    Unselect Checkbox                  ${input}
    Checkbox Should Not Be Selected    ${input}
    Element Should Be Visible          //span[contains(@class,'HvCheckbox-labelTypography') and text()='Label']

unable select checkbox when is disabled 
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxstate
    Wait Until Page Contains Element    ${inputDisabled}    10s
    Element Should Be Disabled          ${inputDisabled}
    Run Keyword And Ignore Error        Click Element       ${inputDisabled}
    Checkbox Should Not Be Selected     ${inputDisabled}
    Element Should Be Disabled          ${inputDisabled}

unable unselect checkbox when is disabled
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxstate
    Wait Until Page Contains Element    ${inputDisabledChecked}     10s
    Run Keyword And Ignore Error        Click Element               ${inputDisabledChecked}
    Element Should Be Disabled          ${inputDisabledChecked}
    Checkbox Should Be Selected         ${inputDisabledChecked}

toggle indeterminate checkbox
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxstate
    Wait Until Element Is Enabled       ${inputIndeterm}    10s
    Checkbox Should Not Be Selected     ${inputIndeterm}
    Element Attribute Value Should Be   ${inputIndeterm}    data-indeterminate  false
    Click Element                       ${inputIndeterm}
    Element Attribute Value Should Be   ${inputIndeterm}    data-indeterminate  true
    Checkbox Should Be Selected         ${inputIndeterm}

unable toggle disabled indeterminate checkbox
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corecheckbox--checkboxstate
    Wait Until Page Contains Element    ${inputIndetermDisabled}    10s
    Element Attribute Value Should Be   ${inputIndetermDisabled}    data-indeterminate  true
    Run Keyword And Ignore Error        Click Element               ${inputIndetermDisabled}
    Element Attribute Value Should Be   ${inputIndetermDisabled}    data-indeterminate  true
