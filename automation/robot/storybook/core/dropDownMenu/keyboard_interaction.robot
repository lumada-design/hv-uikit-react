*** Setting ***
Resource          _resources.resource
Test Template     Run Keyword
Force Tags        keyboard, v3


*** Test Cases ***
drop menu with ENTER           open menu    ENTER
drop menu with DOWN            open menu    ARROW_DOWN
close menu with ESCAPE         close menu    ESCAPE
close menu with TAB            close menu    TAB
focus next item                move focus    ${item1}    ARROW_DOWN    ${item2}
    [Documentation]            also test: Disabled menu items are focusable
focus previous item            move focus    ${item2}    ARROW_UP      ${item1}
focus first item               move focus    ${item2}    HOME          ${item1}
focus last item                move focus    ${item2}    END           ${item3}
from last item focus first     move focus    ${item3}    ARROW_DOWN    ${item1}
from first item focus last     move focus    ${item1}    ARROW_UP      ${item3}
focus button and close menu    move focus    ${item1}    TAB           ${dropDownMenu}

activates item and close menu when item is focused and is pressed ENTER
    [Template]    NONE
    Go To                                ${patterns}dropdown-menu--controlled
    Wait Until Page Contains Element     ${dropDownMenu}
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Visible        ${item1}
    Press Keys                           NONE               ARROW_DOWN
    Element Should Be Focused            ${item2}
    Press Keys                           NONE               ENTER
    Wait Until Element Is Not Visible    ${item2}

focus page elements with TAB
    [Template]    NONE
    Go To                               ${patterns}dropdown-menu--keyboard-navigation
    Wait Until Page Contains Element    ${dropDownMenu}
    set focus and press keys            id:button1         TAB    TAB
    Element Should Be Focused           id:button2


*** Keywords ***
open menu
    [Documentation]    drop menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                               ${patterns}dropdown-menu--disabled-items
    Wait Until Page Contains Element    ${dropDownMenu}
    set focus and press keys            ${dropDownMenu}    ${keyboard}
    Wait Until Element Is Visible       ${item1}
    Element Should Be Focused           ${item1}

close menu
    [Documentation]    close menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                                ${patterns}dropdown-menu--disabled-items
    Wait Until Page Contains Element     ${dropDownMenu}
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Visible        ${item1}
    Press Keys                           NONE               ${keyboard}
    Wait Until Element Is Not Visible    ${item1}

move focus
    [Documentation]    move focus from item to other is pressed keyboard
    [Arguments]    ${itemA}    ${keyboard}    ${itemB}
    Go To                               ${patterns}dropdown-menu--disabled-items
    Wait Until Page Contains Element    ${dropDownMenu}
    Click Element                       ${dropDownMenu}
    Wait Until Element Is Visible       ${itemA}
    Click Element                       ${itemA}
    Press Keys                          NONE               ${keyboard}
    Element Should Be Focused           ${itemB}
