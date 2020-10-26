*** Setting ***
Resource         _assetInventory.resource
Suite Setup      filter cards and reduce Window size
Test Template    keyboard focus from-to
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html
...              Not implemented: Page Up, Page Down, Control + Home, Control + End


*** Test Cases ***                                        FROM        KEYBOARD       TO
focus next card when pressed arrow right                  ${card}(1)    ARROW_RIGHT    ${card}(2)
focus previous card when pressed arrow left               ${card}(2)    ARROW_LEFT     ${card}(1)
focus vertical ascending card when pressed arrow up       ${card}(6)    ARROW_UP       ${card}(3)
focus vertical descending card when pressed arrow down    ${card}(1)    ARROW_DOWN     ${card}(4)
focus first card when pressed home                        ${card}(6)    HOME           ${card}(1)
focus last card when pressed arrow end                    ${card}(1)    END            ${card}(6)
#--- when focus does not move ---
keep focus when pressed right on rightmost cell           ${card}(3)    ARROW_RIGHT    ${card}(3)
keep focus when pressed left on leftmost cell             ${card}(4)    ARROW_LEFT     ${card}(4)
keep focus when pressed right on last card                ${card}(6)    ARROW_RIGHT    ${card}(6)
keep focus when pressed left on first card                ${card}(1)    ARROW_LEFT     ${card}(1)
keep focus when pressed up on first card                  ${card}(1)    ARROW_UP       ${card}(1)
keep focus card when pressed down on last card            ${card}(6)    ARROW_DOWN     ${card}(6)
focus card elements and then next card when pressed tab
    [Template]    NONE
    filter cards and reduce Window size
    Click Element                             ${card}(1)
    Press Keys                                NONE    TAB    TAB    TAB    TAB
    Element Should Be Focused                 ${card}(2) input


*** Keywords ***
keyboard focus from-to
    [Arguments]    ${fromCard}    ${keyboard}    ${toCard}
    Click Element                 ${fromCard}>div
    Press Keys                    ${fromCard}>div    ${keyboard}
    focus assertion by Browser    ${toCard}>div
