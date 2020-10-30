*** Setting ***
Resource       _userPreferences.resource
Suite Setup    open userPreferences sample    ${tests}     two-buttons
Force Tags     keyboard


*** Test Cases ***
focus first item when is loaded
    Wait Until Page Contains Element    ${action}:focus

move focus to next list item when TAB is pressed
    Press Keys                          ${action}    TAB
    Wait Until Page Contains Element    ${option}1:focus
    Press Keys                          NONE    TAB    TAB
    Wait Until Page Contains Element    ${option}3:focus

move focus to previous list item when SHIFT TAB is pressed
    Press Keys                          ${option}3    SHIFT+TAB
    Wait Until Page Contains Element    ${option}2:focus
    Press Keys                          ${option}2    SHIFT+TAB
    Wait Until Page Contains Element    ${option}1:focus

move focus to next page element when TAB is pressed on last list item
    Press Keys                          ${option}4     TAB
    Wait Until Page Contains Element    ${buttonBottom}:focus

move focus to previous page element when SHIFT TAB is pressed on last list item
    Click Element                       ${option}1
    Press Keys                          NONE    SHIFT+TAB    SHIFT+TAB
    Wait Until Page Contains Element    ${buttonTop}:focus
