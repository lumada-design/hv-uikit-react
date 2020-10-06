*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${tests}switch--with-state
...           AND    Wait Until Element Is Enabled    ${switchChecked}


*** Test Cases ***
switch when checkbox is clicked
    Click Element                      ${switchChecked}>span
    Checkbox Should not Be Selected    ${switchChecked} input
    Click Element                      ${switchChecked}>span
    Checkbox Should Be Selected        ${switchChecked} input
    Click Element                      ${switchChecked}>span
    Checkbox Should not Be Selected    ${switchChecked} input

switch when label is clicked
    Checkbox Should Be Selected        ${switchChecked} input
    Click Element                      ${switchChecked}>label
    Checkbox Should not Be Selected    ${switchChecked} input
    Click Element                      ${switchChecked}>label
    Checkbox Should Be Selected        ${switchChecked} input
    Click Element                      ${switchChecked}>label
    Checkbox Should not Be Selected    ${switchChecked} input

switch when is pressed SPACE
    [Tags]    keyboard
    Checkbox Should Be Selected        ${switchChecked} input
    set focus and press keys           ${switchChecked} input    SPACE
    Checkbox Should not Be Selected    ${switchChecked} input
    Press keys                         NONE    SPACE
    Checkbox Should Be Selected        ${switchChecked} input

switch when is controlled by other component
    [Setup]    Go To                    ${forms}switch--controlled
    Wait Until Page Contains Element    ${switchControlled}
    Checkbox Should not Be Selected     ${switchControlled}
    Click Button                        Toggle
    Checkbox Should Be Selected         ${switchControlled}
    Click Button                        Toggle
    Checkbox Should not Be Selected     ${switchControlled}

does not switch when is disabled
    Checkbox Should Be Selected     ${switchDisabled} input
    Run Keyword And Ignore Error
    ...    Click Element            ${switchDisabled}
    Checkbox Should Be Selected     ${switchDisabled} input
    set focus and press keys        ${switchDisabled} input    SPACE
    Checkbox Should Be Selected     ${switchDisabled} input


*** Variables ***
${switchChecked}       css:#checkState2
${switchDisabled}      css:#checkState4
${switchControlled}    css:input[type=checkbox]
