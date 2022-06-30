*** Setting ***
Resource          _dropDownMenu.resource
Test Template     Run Keyword
Force Tags        keyboard
Documentation     https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12


*** Test Cases ***
drop menu with ENTER           open menu     ENTER
drop menu with DOWN            open menu     ARROW_DOWN
close menu with ESCAPE         close menu    ESCAPE
close menu with TAB            close menu    TAB
focus next disabled item       move focus    ${item1}    ARROW_DOWN    ${item2}
focus previous item            move focus    ${item2}    ARROW_UP      ${item1}
focus first item               move focus    ${item2}    HOME          ${item1}
focus last item                move focus    ${item2}    END           ${item3}
from last item focus first     move focus    ${item3}    ARROW_DOWN    ${item1}
from first item focus last     move focus    ${item1}    ARROW_UP      ${item3}

# src/utils/focusableElementFinder.js incorrectly selects non-visible and disabled elements
# so it is not reliable
# focus button and close menu    move focus    ${item1}    TAB           ${dropDownMenu}

activates item and close menu when item is focused and is pressed ENTER
    [Template]    NONE
    Go To                                ${inputs}dropdown-menu--controlled
    Wait Until Page Contains Element     ${dropDownMenu}
    Click Element                        ${dropDownMenu}
    Wait Until Element Is Visible        ${item1}
    Press Keys                           NONE               ARROW_DOWN
    Element Should Be Focused            ${item2}
    Press Keys                           NONE               ENTER
    Wait Until Element Is Not Visible    ${item2}

focus page elements with TAB
    [Template]    NONE
    [Documentation]   integration test, verify TAB sequence between components
    Go To                               ${tests}dropdown-menu--keyboard-navigation
    Wait Until Page Contains Element    ${dropDownMenu}
    set focus and press keys            ${button1}    TAB
    Wait Until Page Contains Element    ${dropDownMenu}:focus
    Press Keys                          NONE    TAB
    Wait Until Page Contains Element    ${button2}:focus


*** Keywords ***
open menu
    [Documentation]    drop menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    Go To                               ${inputs}dropdown-menu--disabled-items
    Wait Until Element Is Enabled       ${dropDownMenu}
    set focus and press keys            ${dropDownMenu}    ${keyboard}
    Wait Until Element Is Visible       ${menuList}
    Element Should Be Focused           ${item1}

close menu
    [Documentation]    close menu when is focused and is pressed keyboard
    [Arguments]    ${keyboard}
    open dropdownmenu sample             ${inputs}    disabled-items
    Press Keys                           NONE     ${keyboard}
    Wait Until Element Is Not Visible    ${item1}

move focus
    [Documentation]    move focus from item to other is pressed keyboard
    [Arguments]    ${previous}    ${keyboard}    ${next}
    open dropdownmenu sample            ${inputs}    disabled-items
    Click Element                       ${previous}
    Press Keys                          NONE    ${keyboard}
    Wait Until Page Contains Element    ${next}:focus


*** Variables ***
${button1}    css:#button1
${button2}    css:#button2
