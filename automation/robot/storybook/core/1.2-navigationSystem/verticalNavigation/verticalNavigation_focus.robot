*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=core-new-vertical-navigation--collapsable    ${vnBurger}     10s
Test Teardown     Run Keyword If Test Failed                      Capture Page Screenshot    ${SUITE_NAME}.png
Force Tags        smoke
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
focus: focus is set on the first node when tree receives focus
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}     4s
    set focus and press keys         ${vNExpanded}     TAB
    Element Should Be Focused        ${vnItem1}>div

focus: does not focus item when item is selected with mouse Click
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}         4s
    Click Element                    ${vnItem2.3.1}
    verify element is not focused    ${vnItem2.3.1}>div

focus: keep the focus when item is selected with keyboard
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}       4s
    vertical navigation item should not be selected    ${vnItem1.1}
    set focus and press keys                           ${vNExpanded}       TAB      TAB
    Element Should Be Focused                          ${vnItem1.1}>div
    Press Keys                                         NONE                ENTER
    Element Should Be Focused                          ${vnItem1.1}>div

focus: focus action item when action item is selected
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}    4s
    verify element is not focused    ${vnAction2}
    Click Element                    ${vnAction2}
    Element Should Be Focused        ${vnAction2}

focus: change background color when an item is selected
    Click Element                           ${vnBurger}
    Wait Until Element Is Visible           ${vNExpanded}             4s
    Click Element                           ${vnItem1.1.1}
    ${color}                                get css property value    ${vnItem1.1.2}>div    background-color
    Mouse Over                              ${vnItem1.1.2}
    wait until css attribute not contain    ${vnItem1.1.2}>div        background-color      ${color}

mouse hover: change background color when mouse is hover item 
    Click Element                           ${vnBurger}
    Wait Until Element Is Visible           ${vNExpanded}             4s
    ${color}                                get css property value    ${vnItem1.1.1}>div    background-color
    Mouse Over                              ${vnItem1.1.1}
    wait until css attribute not contain    ${vnItem1.1.1}>div        background-color      ${color}
