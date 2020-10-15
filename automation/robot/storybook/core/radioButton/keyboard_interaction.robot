*** Setting ***
Resource      _radioButton.resource
Force Tags    keyboard


*** Test Cases ***
focus first radio button when no one is selected
    [Setup]    open radioButton sample    main
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${radio}(1) input

focus radio button selected
    [Setup]    open radioButton sample    read-only
    Press Keys                   css:body    TAB
    Element Should Be Focused    ${radio}(2) input

iteratable when is readOnly but not selectable
    [Setup]    open radioButton sample    read-only
    Press Keys                            css:body    TAB
    Element Should Be Focused             ${radio}(2) input
    Press Keys                            NONE  ARROW_LEFT    SPACE
    Element Should Be Focused             ${radio}(1) input
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)

TAB sequence
    [Setup]    open radioButton sample    main
    Press Keys                          css:body    TAB
    Element Should Be Focused           ${radio}(1) input
    Press Keys                          NONE    TAB
    html body should be focused

SPACE checks the focused radio button if it is not already checked
    [Setup]   open radioButton sample    main
    radioButton should not be selected    ${radio}(1)
    radioButton should not be selected    ${radio}(2)
    Press Keys                            css:body    TAB     SPACE
    radioButton should be selected        ${radio}(1)
    radioButton should not be selected    ${radio}(2)
