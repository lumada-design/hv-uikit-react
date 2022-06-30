*** Setting ***
Resource          _verticalNavigation.resource
Test Setup        open vertical navigation sample    ${structure}    collapsable
Force Tags        keyboard
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
focus next item but keep item selection when press TAB
    vertical navigation item should be selected    ${item2.3.2}
    set focus and press keys                       ${expanded}    TAB    TAB
    Element Should Be Focused                      ${item1.1}>div
    vertical navigation item should be selected    ${item2.3.2}

focus previous item but keep item selection when press SHIFT-TAB
    vertical navigation item should be selected    ${item2.3.2}
    set focus and press keys                       ${expanded}    TAB    TAB
    Element Should Be Focused                      ${item1.1}>div
    Press Keys                                     NONE    SHIFT+TAB
    Element Should Be Focused                      ${item1}>div
    vertical navigation item should be selected    ${item2.3.2}

focus previous item when an item is clicked and is pressed SHIFT-TAB
    [Documentation]   traceability issues/1124
    Click Element                ${item2.3.2}
    Press Keys                   NONE    SHIFT+TAB
    Element Should Be Focused    ${item2.3.1}>div

select an item when it is focused and is pressed ENTER
    vertical navigation item should not be selected    ${item1}
    set focus and press keys                           ${expanded}    TAB
    Element Should Be Focused                          ${item1}>div
    Press Keys                                         NONE    ENTER
    vertical navigation item should be selected        ${item1}

select an item when it is focused and is pressed SPACE
    set focus and press keys                           ${expanded}    TAB
    vertical navigation item should not be selected    ${item1}
    Element Should Be Focused                          ${item1}>div
    Press Keys                                         NONE    SPACE
    vertical navigation item should be selected        ${item1}
