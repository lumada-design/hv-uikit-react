*** Setting ***
Resource      _checkbox.resource
Force Tags    keyboard


*** Test Cases ***
focus first checkbox
    [Setup]    open checkbox sample    main
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${checkbox}(1) input

iteratable when is readOnly but not selectable
    [Setup]    open checkbox sample    read-only
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    Checkbox Should Be Selected          ${checkbox}(2) input
    Checkbox Should Not Be Selected      ${checkbox}(3) input
    Press Keys                           css:body    TAB   SPACE
    Element Should Be Focused            ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    Press Keys                           NONE    TAB   SPACE
    Element Should Be Focused            ${checkbox}(2) input
    Checkbox Should Be Selected          ${checkbox}(2) input

not iteratable when is disabled
    [Setup]    open checkbox sample    disabled
    Press Keys                     css:body    TAB
    html body should be focused

TAB sequence
    [Setup]    open checkbox sample    main
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${checkbox}(1) input
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${checkbox}(2) input
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${checkbox}(3) input

press SPACE change the selection
    [Setup]    open checkbox sample    main
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    Checkbox Should Be Selected          ${checkbox}(2) input
    Checkbox Should Not Be Selected      ${checkbox}(3) input
    Press Keys                           css:body    TAB    SPACE
    Press Keys                           NONE    TAB    SPACE
    Press Keys                           NONE    TAB    SPACE
    Checkbox Should Be Selected          ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(2) input
    Checkbox Should Be Selected          ${checkbox}(3) input
