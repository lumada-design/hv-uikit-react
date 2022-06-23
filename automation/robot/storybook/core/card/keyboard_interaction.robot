*** Setting ***
Resource      _card.resource
Test Setup    open card sample    ${display}    selectable
Force Tags    keyboard


*** Test Cases ***
Tab sequence on complex card
    Press Keys                          ${card}   TAB
    Wait Until Page Contains Element    ${checkbox}:focus
    Press Keys                          NONE  TAB
    Wait Until Page Contains Element    ${buttonStar}:focus
    Press Keys                          NONE  TAB
    Wait Until Page Contains Element    ${buttonView}:focus
    Press Keys                          NONE  TAB
    Wait Until Page Contains Element    ${buttonDismiss}:focus

interact with checkbox in card
    Checkbox Should Not Be Selected    ${checkbox}
    set focus and press keys           ${checkbox}    SPACE
    Checkbox Should Be Selected        ${checkbox}

#TO DO
#interact with simple card
#    [Documentation]
#    ...    https://insightgroup.atlassian.net/browse/HVUIKIT-5574
#    ...    waiting for this dev
#    ...    test goal is focus/activate a simple(naked, no other components) card


*** Variables ***
${buttonStar}       css:button[aria-label=Star]
${buttonView}       css:#view
${buttonDismiss}    css:#dismiss
