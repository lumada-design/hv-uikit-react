*** Setting ***
Resource          _checkbox.resource
Suite Setup       reduce Selenium Speed for ie keyboard events    1s
Suite Teardown    Set Selenium Speed    0s
Force Tags        keyboard


*** Test Cases ***
iteratable when is readOnly but not selectable
    [Setup]    open checkbox sample    read-only
    set focus and press keys           ${checkbox}(1) input    SPACE
    Checkbox Should Not Be Selected    ${checkbox}(1) input
    Press Keys                         NONE    TAB
    Wait Until Page Contains Element   ${checkbox}(2) input:focus
    #Element Should Be Focused          ${checkbox}(2) input
    Press Keys                         NONE    SPACE
    Checkbox Should Be Selected        ${checkbox}(2) input

not iteratable when is disabled
    [Setup]    open checkbox sample    disabled
    set focus and press keys       css:body    TAB
    html body should be focused

TAB sequence
    [Setup]    open checkbox sample    main
    set focus and press keys            ${checkbox}(1) input    TAB
    Wait Until Page Contains Element    ${checkbox}(2) input:focus
    Press Keys                          NONE    TAB
    Wait Until Page Contains Element    ${checkbox}(3) input:focus

press SPACE change the selection
    [Setup]    open checkbox sample    main
    set focus and press keys           ${checkbox}(1) input    SPACE
    Checkbox Should Be Selected        ${checkbox}(1) input
    Press Keys                         NONE    TAB    SPACE
    Checkbox Should Not Be Selected    ${checkbox}(2) input
    Press Keys                         NONE    TAB    SPACE
    Checkbox Should Be Selected        ${checkbox}(3) input
