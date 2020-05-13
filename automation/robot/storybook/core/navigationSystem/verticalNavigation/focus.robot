*** Setting ***
Library           SeleniumLibrary
Resource          _verticalNavigation.resource
Suite Setup       open storybook    ${iframeCollapsable}
Test Setup        Run Keywords
...               Reload Page    AND
...               Wait Until Element Is Visible    ${burger}    10s
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
focus first item when tree receives focus
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${expanded}    4s
    set focus and press keys         ${expanded}    TAB
    Element Should Be Focused        ${item1}>div

focus item when item is selected with mouse Click
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${expanded}    4s
    Click Element                    ${item2.3.1}
    Element Should Be Focused        ${item2.3.1}>div

keep the focus when item is selected with keyboard
    Click Element                                      ${burger}
    Wait Until Element Is Visible                      ${expanded}    4s
    vertical navigation item should not be selected    ${item1.1}
    set focus and press keys                           ${expanded}    TAB    TAB
    Element Should Be Focused                          ${item1.1}>div
    Press Keys                                         NONE    ENTER
    Element Should Be Focused                          ${item1.1}>div

focus action item when action item is selected
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${expanded}    4s
    verify element is not focused    ${action2}
    Click Element                    ${action2}
    Element Should Be Focused        ${action2}
