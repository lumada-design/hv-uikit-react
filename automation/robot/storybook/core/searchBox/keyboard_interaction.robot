*** Setting ***
Resource      _searchBox.resource
Test Setup    open searchBox sample     dynamic-search
Force Tags    keyboard


*** Test Cases ***
basic search ENTER
    [Documentation]   show search results when is pressed Enter
    [Setup]    open searchBox sample     basic-search
    Page Should Not Contain     Results
    Press Keys                  ${searchBox}    ENTER
    Wait Until Page Contains    Results

focus first suggestion option when input is focused and is pressed TAB
    [Documentation]
    ...   use cases:
    ...   Can be focused
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${searchBox} input
    Press Keys                   NONE    P    TAB
    Element Should Be Focused    ${suggestion}:first-child

Tab sequence
    [Documentation]
    ...   use cases:
    ...   Clear button is only usable with mouse (a clean shortcut)
    Press Keys                          NONE    TAB
    Element Should Be Focused           ${searchBox} input
    Press Keys                          NONE    P     TAB
    Element Should Be Focused           ${suggestion}:first-child
    Press Keys                          NONE    TAB
    Element Should Be Focused           ${searchBox} input
    Press Keys                          NONE    TAB
    Element Should Be Focused           css:body

return focus to input when suggestion is focused and is pressed ESCAPE
    Press Keys                          ${searchBox} input    P    TAB
    Element Should Be Focused           ${suggestion}:first-child
    Press Keys                          NONE    ESCAPE
    Wait Until Page Contains Element    ${suggestion}    limit=0
    Element Should Be Focused           ${searchBox} input

change suggestion focus when pressed arrows up and down
    Press Keys                          ${searchBox} input    P    TAB
    Element Should Be Focused           ${suggestion}:first-child
    Press Keys                          NONE    ARROW_UP
    Element Should Be Focused           ${suggestion}:last-child
    Press Keys                          NONE    ARROW_DOWN    ARROW_DOWN
    Element Should Be Focused           ${suggestion}:nth-child(2)

select and close suggestions when it is focused and is pressed ENTER
    Press Keys                           ${searchBox} input    po
    Wait Until Element Is Visible        ${suggestion}
    Press Keys                           NONE    TAB    ARROW_DOWN
    Element Should Be Focused            ${suggestion}:nth-child(2)
    Press Keys                           NONE    ENTER
    Wait Until Page Contains Element     ${suggestion}    limit=0
    Textfield Value Should Be            ${searchBox} input    Portugal
