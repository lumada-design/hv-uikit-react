*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To                            ${tests}switch--with-state    AND
...           Wait Until Element Is Enabled    ${switchUnchecked}
Force Tags    v3


*** Variables ***
${switchUnchecked}            css:#checkState1-input
${switchChecked}              css:#checkState2-input
${switchDisabledUnchecked}    css:#checkState3-input
${switchDisabledChecked}      css:#checkState4-input
${switchControlled}           css:input[type=checkbox]

*** Test Cases ***
switch to off,on,off when checkbox is clicked 3 times
    Checkbox Should Be Selected        ${switchChecked}
    Click Element                      ${switchChecked}
    Checkbox Should not Be Selected    ${switchChecked}
    Click Element                      ${switchChecked}
    Checkbox Should Be Selected        ${switchChecked}
    Click Element                      ${switchChecked}
    Checkbox Should not Be Selected    ${switchChecked}

does not switch when disabled element is clicked
    Checkbox Should Be Selected     ${switchDisabledChecked}
    Run Keyword And Ignore Error    Click Element               ${switchDisabledChecked}
    Checkbox Should Be Selected     ${switchDisabledChecked}

switch to Off when checkbox is focused and is pressed SPACE
    [Tags]                             keyboard
    Checkbox Should Be Selected        ${switchChecked}
    set focus and press keys           ${switchChecked}    SPACE
    Checkbox Should not Be Selected    ${switchChecked}
    Press keys                         NONE                SPACE
    Checkbox Should Be Selected        ${switchChecked}

switch state when is controlled by other component
    [Setup]                             NONE
    Go To                               ${forms}switch--controlled
    Wait Until Page Contains Element    ${switchControlled}
    Checkbox Should not Be Selected     ${switchControlled}
    Click Button                        Toggle
    Checkbox Should Be Selected         ${switchControlled}
    Click Button                        Toggle
    Checkbox Should not Be Selected     ${switchControlled}
