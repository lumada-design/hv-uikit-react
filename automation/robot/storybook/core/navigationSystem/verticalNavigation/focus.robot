*** Setting ***
Resource          _verticalNavigation.resource
Test Setup        Run Keywords
...               Go To    ${components}navigation-system-vertical-navigation--collapsable    AND
...               Wait Until Element Is Visible    ${burger}
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
focus first item when tree receives focus
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${expanded}
    set focus and press keys         ${expanded}    TAB
    Element Should Be Focused        ${item1}>div

focus item when item is selected with mouse Click
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${expanded}
    Click Element                    ${item2.3.1}
    Element Should Be Focused        ${item2.3.1}>div

keep the focus when item is selected with keyboard
    Click Element                                      ${burger}
    Wait Until Element Is Visible                      ${expanded}
    vertical navigation item should not be selected    ${item1.1}
    set focus and press keys                           ${expanded}    TAB    TAB
    Element Should Be Focused                          ${item1.1}>div
    Press Keys                                         NONE    ENTER
    Element Should Be Focused                          ${item1.1}>div

focus action item when action item is selected
    Click Element                               ${burger}
    Wait Until Element Is Visible               ${expanded}
    Wait Until Page Does Not Contain Element    ${action2}:focus
    Click Element                               ${action2}
    Element Should Be Focused                   ${action2}
