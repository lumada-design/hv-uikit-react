*** Setting ***
Resource      _radioButtonGroup.resource
Force Tags    keyboard    v3


*** Test Cases ***
TAB focus checked radio button
    open radio button group sample    horizontal
    Press Keys                        ${label}    TAB
    Element Should Be Focused         ${radioButton2} :checked

TAB first radio button in the group when none of the radio buttons are checked
    [Setup]    go to    ${tests}forms-radio-button-group--required
    ${radioButton1}   Set Variable   css:#hv-form-element-2
    Wait Until Element Is Enabled    ${radioButtonGroup}
    Press Keys                       ${label}    TAB
    Element Should Be Focused        ${radioButton1} input

SPACE checks the focused radio button if it is not already checked
    [Setup]    go to    ${tests}forms-radio-button-group--required
    Wait Until Element Is Enabled      ${radioButtonGroup}
    Press Keys                         ${label}    TAB
    Page Should Not Contain Element    ${radioButtons} :checked
    Press Keys                         NONE    SPACE
    Element Should Be Focused          ${radioButtons} :checked

RIGHT Arrow move focus and check next radio button in the group
    [Documentation]    If focus is on the last button, focus moves to the first button.
    [Setup]   open radio button group sample    main
    Press Keys                        ${label}    TAB
    Element Should Be Focused         ${radioButton2} :checked
    Press Keys                        NONE    ARROW_RIGHT
    Element Should Be Focused         ${radioButton3} :checked
    Press Keys                        NONE    ARROW_RIGHT
    Element Should Be Focused         ${radioButton1} :checked

DOWN Arrow move focus and check next radio button in the group
    [Documentation]    If focus is on the last button, focus moves to the first button.
    [Setup]   open radio button group sample    horizontal
    Press Keys                        ${label}    TAB
    Element Should Be Focused         ${radioButton2} :checked
    Press Keys                        NONE    ARROW_DOWN
    Element Should Be Focused         ${radioButton3} :checked
    Press Keys                        NONE    ARROW_DOWN
    Element Should Be Focused         ${radioButton1} :checked

LEFT Arrow move focus and check previous radio button in the group
    [Documentation]    If focus is on the first button, focus moves to the last button.
    [Setup]   open radio button group sample    horizontal
    Press Keys                        ${label}    TAB
    Element Should Be Focused         ${radioButton2} :checked
    Press Keys                        NONE    ARROW_LEFT
    Element Should Be Focused         ${radioButton1} :checked
    Press Keys                        NONE    ARROW_LEFT
    Element Should Be Focused         ${radioButton3} :checked

UP Arrow move focus and check previous radio button in the group
    [Documentation]    If focus is on the first button, focus moves to the last button.
    [Setup]   open radio button group sample    main
    Press Keys                        ${label}    TAB
    Element Should Be Focused         ${radioButton2} :checked
    Press Keys                        NONE    ARROW_UP
    Element Should Be Focused         ${radioButton1} :checked
    Press Keys                        NONE    ARROW_UP
    Element Should Be Focused         ${radioButton3} :checked

iteratable when is readonly but not selectable
    [Setup]   open radio button group sample    read-only
    Press Keys                        ${label}    TAB
    Press Keys                        NONE    ARROW_RIGHT
    Element Should Be Focused         ${radioButton3} input
    Press Keys                        NONE    ARROW_DOWN
    Element Should Be Focused         ${radioButton1} input
    Press Keys                        NONE    SPACE
    Page Should Contain Element       ${radioButton2} :checked
