*** Setting ***
Resource         _radioButton.resource
Force Tags       keyboard
Test Template    should move focus and selection


*** Test Cases ***
LEFT Arrow move focus and selection     ARROW_LEFT
RIGHT Arrow move focus and selection    ARROW_RIGHT
UP Arrow move focus and selection       ARROW_UP
DOWN Arrow move focus and selection     ARROW_DOWN


*** Keywords ***
should move focus and selection
    [Arguments]    ${arrow}
    open radioButton sample               main
    radioButton should not be selected    ${radio}(1)
    radioButton should not be selected    ${radio}(2)
    Press Keys                            css:body    TAB     ${arrow}
    radioButton should be selected        ${radio}(2)
    Press Keys                            NONE    ${arrow}
    radioButton should be selected        ${radio}(1)
    Press Keys                            NONE    ${arrow}
    radioButton should not be selected    ${radio}(1)
    radioButton should be selected        ${radio}(2)
