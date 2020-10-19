*** Setting ***
Resource         _radioButtonGroup.resource
Force Tags       keyboard
Test Template    Run Keyword
Documentation    https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-14


*** Test Cases ***
LEFT Arrow     should select previous radio button     ARROW_LEFT
UP Arrow       should select previous radio button     ARROW_UP
RIGHT Arrow    should select next radio button         ARROW_RIGHT
DOWN Arrow     should select next radio button         ARROW_DOWN


*** Keywords ***
should select previous radio button
    [Arguments]    ${arrow}
    open radio button group sample        main
    Press Keys                            ${label}    TAB
    radioButton should be selected        ${radio}(2)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(1)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(3)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(2)

should select next radio button
    [Arguments]    ${arrow}
    open radio button group sample        main
    Press Keys                            ${label}    TAB
    radioButton should be selected        ${radio}(2)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(3)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(1)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(2)
