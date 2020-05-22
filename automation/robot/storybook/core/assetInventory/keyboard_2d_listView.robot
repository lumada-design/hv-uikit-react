*** Setting ***
Library           SeleniumLibrary
Resource          _keywords.resource
Suite Setup       Run Keywords
...               open storybook    AND
...               filter cards and reduce Window size    AND
...               Click Button   ${listViewButton}
Test Template     list view move focus from-to locator when pressed keyboard
Suite Teardown    Close Browser
Force Tags        smoke    keyboard
Documentation     https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html
...               Not implemented: Page Up, Page Down, Control + Home, Control + End


*** Test Cases ***                                       from      keyboard       to
focus vertical ascending row when pressed arrow up      ${row6}    ARROW_UP       ${row5}
focus vertical descending row when pressed arrow down   ${row1}    ARROW_DOWN     ${row2}
focus first row when pressed home                       ${row6}    HOME           ${row1}
focus last row when pressed arrow end                   ${row1}    END            ${row6}
# --- when focus does not move ---
focus does not move when pressed up on first row        ${row1}    ARROW_UP       ${row1}
focus does not move when pressed down on last row       ${row6}    ARROW_DOWN     ${row6}
focus does not move when pressed arrow right            ${row1}    ARROW_RIGHT    ${row1}
focus does not move when pressed right on last row      ${row6}    ARROW_RIGHT    ${row6}
focus does not move when pressed arrow left             ${row2}    ARROW_LEFT     ${row2}
focus does not move when pressed left on first row      ${row1}    ARROW_LEFT     ${row1}
focus row elements and then next row when pressed tab
    [Template]    NONE
    filter cards and reduce Window size
    Click Button                              ${listViewButton}
    Click Element                             ${row1}>div:nth-child(1)
    Press Keys                                NONE    TAB    TAB    TAB
    Element Should Be Focused                 ${row2} input
    element attribute value should contain    ${row2}    class    -focused


*** Keywords ***
list view move focus from-to locator when pressed keyboard
    [Arguments]    ${from}    ${keyboard}    ${to}
    Click Element                ${from}>div:nth-child(1)
    Press Keys                   ${from}    ${keyboard}
    focus assertion by Browser   ${to}
