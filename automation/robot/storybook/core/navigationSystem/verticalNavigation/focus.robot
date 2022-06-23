*** Setting ***
Resource          _verticalNavigation.resource
Test Setup        open vertical navigation sample    ${structure}    collapsable
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
focus first item when tree receives focus
    set focus and press keys         ${expanded}    TAB
    Element Should Be Focused        ${item1}>div

focus item when item is selected with mouse Click
    Click Element                    ${item2.3.1}
    Element Should Be Focused        ${item2.3.1}>div

keep the focus when item is selected with keyboard
    vertical navigation item should not be selected    ${item1.1}
    set focus and press keys                           ${expanded}    TAB    TAB
    Element Should Be Focused                          ${item1.1}>div
    Press Keys                                         NONE    ENTER
    Element Should Be Focused                          ${item1.1}>div
