*** Setting ***
Resource         ../_datePicker.resource
Test Template    focus day as arrow interaction
Force Tags       keyboard


*** Test Cases ***                                         from          arrow          to
focus next day when pressed arrow right                    ${day}\[1]     ARROW_RIGHT    ${day}\[2]
focus previous day when pressed arrow left                 ${day}\[2]     ARROW_LEFT     ${day}\[1]
focus next day when pressed arrow right on Saturday        ${day}\[7]     ARROW_RIGHT    ${day}\[8]
focus previous day when pressed arrow left on Sunday       ${day}\[8]     ARROW_LEFT     ${day}\[7]
focus vertical ascending day when pressed arrow up         ${day}\[8]     ARROW_UP       ${day}\[1]
focus vertical descending day when pressed arrow down      ${day}\[1]     ARROW_DOWN     ${day}\[8]
# --- when focus does not move ---
keep focus when pressed right on last day                  ${day}\[31]    ARROW_RIGHT    ${day}\[31]
keep focus when pressed left on first day                  ${day}\[1]     ARROW_LEFT     ${day}\[1]
keep focus when pressed up on first day                    ${day}\[1]     ARROW_UP       ${day}\[1]
keep focus day when pressed down on last day               ${day}\[31]    ARROW_DOWN     ${day}\[31]


*** Keywords ***
focus day as arrow interaction
    [Documentation]    verify if focus moves ${from} ${to} other day
    ...                when is an arrow ${arrow}
    [Arguments]    ${from}    ${arrow}     ${to}
    Go To                            ${tests}calendar--single-date
    Wait Until Element Is Enabled    ${from}
    set focus and press keys         ${from}    ${arrow}
    Element Should Be Focused        ${to}
