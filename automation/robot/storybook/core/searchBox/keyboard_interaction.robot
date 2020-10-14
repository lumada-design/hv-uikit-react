*** Setting ***
Resource      _searchBox.resource
Test Setup    open searchBox sample     dynamic-search
Force Tags    keyboard


*** Test Cases ***
focus first suggestion option when input is focused and is pressed TAB
    [Documentation]
    ...   use cases:
    ...   Can be focused
    Press Keys                   ${searchBox} label    TAB
    Element Should Be Focused    ${searchBox} input
    Press Keys                   NONE    P    TAB
    Element Should Be Focused    ${searchBox} li:first-child

Tab sequence
    [Documentation]
    ...   use cases:
    ...   Clear button is only usable with mouse (a clean shortcut)
    Press Keys                          ${searchBox} label    TAB
    Element Should Be Focused           ${searchBox} input
    Press Keys                          NONE    P     TAB
    Element Should Be Focused           ${searchBox} li:first-child
    Press Keys                          NONE    TAB
    Element Should Be Focused           ${searchBox} input
    Press Keys                          NONE    TAB
    Element Should Be Focused           css:body

return focus to input when suggestion is focused and is pressed ESCAPE
    Press Keys                          ${searchBox} input    P    TAB
    Element Should Be Focused           ${searchBox} li:first-child
    Press Keys                          NONE    ESCAPE
    Wait Until Page Contains Element    ${searchBox} li    limit=0
    Element Should Be Focused           ${searchBox} input

change suggestion focus when pressed arrows up and down
    Press Keys                          ${searchBox} input    P    TAB
    Element Should Be Focused           ${searchBox} li:first-child
    Press Keys                          NONE    ARROW_UP
    Element Should Be Focused           ${searchBox} li:last-child
    Press Keys                          NONE    ARROW_DOWN    ARROW_DOWN
    Element Should Be Focused           ${searchBox} li:nth-child(2)

select and close suggestions when it is focused and is pressed ENTER
    Press Keys                           ${searchBox} input    po
    Wait Until Element Is Visible        ${searchBox} li
    Press Keys                           NONE    TAB    ARROW_DOWN
    Element Should Be Focused            ${searchBox} li:nth-child(2)
    Press Keys                           NONE    ENTER
    Wait Until Page Contains Element     ${searchBox} li    limit=0
    Textfield Value Should Be            ${searchBox} input    Portugal
