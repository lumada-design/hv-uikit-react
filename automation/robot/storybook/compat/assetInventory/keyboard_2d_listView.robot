*** Setting ***
Resource         _assetInventory.resource
Suite Setup      Run Keywords
...              filter cards and reduce Window size    AND
...              Click Button   ${buttonListView}
Test Template    keyboard focus from-to
Force Tags       keyboard
Documentation    https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html
...              Not implemented: Page Up, Page Down, Control + Home, Control + End


*** Test Cases ***                                       from      keyboard       to
focus vertical ascending row when pressed arrow up      ${row}(6)    ARROW_UP       ${row}(5)
focus vertical descending row when pressed arrow down   ${row}(1)    ARROW_DOWN     ${row}(2)
focus first row when pressed home                       ${row}(6)    HOME           ${row}(1)
focus last row when pressed arrow end                   ${row}(1)    END            ${row}(6)
# --- when focus does not move ---
focus does not move when pressed up on first row        ${row}(1)    ARROW_UP       ${row}(1)
focus does not move when pressed down on last row       ${row}(6)    ARROW_DOWN     ${row}(6)
focus does not move when pressed arrow right            ${row}(1)    ARROW_RIGHT    ${row}(1)
focus does not move when pressed right on last row      ${row}(6)    ARROW_RIGHT    ${row}(6)
focus does not move when pressed arrow left             ${row}(2)    ARROW_LEFT     ${row}(2)
focus does not move when pressed left on first row      ${row}(1)    ARROW_LEFT     ${row}(1)
focus row elements and then next row when pressed tab
    [Template]    NONE
    filter cards and reduce Window size
    Click Button                              ${buttonListView}
    Click Element                             ${row}(1)>div:nth-child(1)
    Press Keys                                NONE    TAB    TAB    TAB
    Element Should Be Focused                 ${row}(2) input
    element attribute value should contain    ${row}(2)    class    -focused


*** Keywords ***
keyboard focus from-to
    [Arguments]    ${from}    ${keyboard}    ${to}
    Click Element                ${from}>div:nth-child(1)
    Press Keys                   ${from}    ${keyboard}
    focus assertion by Browser   ${to}
