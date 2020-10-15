*** Setting ***
Resource      _toggleSwitch.resource


*** Test Cases ***
state transition
    [Documentation]   change state when element is clicked
    [Setup]    open toggle switch sample    main
    Checkbox Should not Be Selected    ${switch}(1) input
    Click Element                      ${switch}(1)
    Checkbox Should Be Selected        ${switch}(1) input
    Click Element                      ${switch}(1)
    Checkbox Should not Be Selected    ${switch}(1) input

disabled toggle switch
    [Setup]    open toggle switch sample    disabled
    Checkbox Should not Be Selected    ${switch}(1) input
    Click Element                      ${switch}(1)
    Checkbox Should not Be Selected    ${switch}(1) input

read only toggle switch
    [Setup]    open toggle switch sample    read-only
    Checkbox Should not Be Selected    ${switch}(1) input
    Click Element                      ${switch}(1)
    Checkbox Should not Be Selected    ${switch}(1) input
    Checkbox Should Be Selected        ${switch}(2) input
    Click Element                      ${switch}(2)
    Checkbox Should Be Selected        ${switch}(2) input

required toggle switch
    [Setup]    open toggle switch sample    required
    Element Should Not Be Visible      ${warningText}
    Checkbox Should Be Selected        ${switch}(1) input
    Click Element                      ${switch}(1)
    Checkbox Should not Be Selected    ${switch}(1) input
    Wait Until Element Is Visible      ${warningText}
    Click Element                      ${switch}(1)
    Checkbox Should Be Selected        ${switch}(1) input
    Wait Until Element Is Not Visible  ${warningText}

controlled toggle switch
    [Setup]    open toggle switch sample    controlled
    Page Should Contain                The switch is Off
    Checkbox Should not Be Selected    ${switches} input
    Click Button                       Toggle
    Wait Until Page Contains           The switch is On
    Checkbox Should Be Selected        ${switches} input
    Click Element                      ${switches}
    Wait Until Page Contains           The switch is Off
    Checkbox Should not Be Selected    ${switches} input

TAB sequence
    [Tags]    keyboard
    [Setup]    open toggle switch sample    main
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${switch}(1) input
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${switch}(2) input

switch when is pressed SPACE
    [Tags]    keyboard
    [Setup]    open toggle switch sample    main
    Checkbox Should not Be Selected    ${switch}(1) input
    Press Keys                         css:body    TAB    SPACE
    Checkbox Should Be Selected        ${switch}(1) input
    Press Keys                         NONE    SPACE
    Checkbox Should not Be Selected    ${switch}(1) input
