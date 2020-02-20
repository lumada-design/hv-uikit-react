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


*** Comments ***
complementary test cases:
 - Test Suite "verticalNavigation_keyboard_interaction.robot" 
  - Test Case "escape: close vertical navigation menu when ESCAPE is pressed"


*** Test Cases ***
expand vertical navigation menu when burger is clicked
    Element Should Not Be Visible    ${vNExpanded}
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}    4s

close vertical navigation menu when it id opened and burger is clicked
    Element Should Not Be Visible        ${vNExpanded}
    Click Element                        ${vnBurger}
    Wait Until Element Is Visible        ${vNExpanded}    4s
    Click Element                        ${vnBurger}
    Wait Until Element Is Not Visible    ${vNExpanded}    4s

doesn't close vertical anchor bar when vertical navigation menu is closed   
    Element Should Be Visible            ${vnAnchorBar}
    Click Element                        ${vnBurger}
    Wait Until Element Is Visible        ${vNExpanded}     4s
    Click Element                        ${vnBurger}
    Wait Until Element Is Not Visible    ${vNExpanded}     4s
    Element Should Be Visible            ${vnAnchorBar}

api closeOnExit true: close vertical navigation menu when is clicked any area out of vertical navigation 
    [Setup]                              Go To            ${STORYBOOK_URL}/iframe.html?id=core-new-vertical-navigation--closeonexit
    Wait Until Element Is Visible        ${vnBurger}      10s
    Click Element                        ${vnBurger}
    Wait Until Element Is Visible        ${vNExpanded}    4s
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${vNExpanded}    4s

api closeOnExit false: doesn't close vertical navigation menu when is clicked any area out of vertical navigation 
    Element Should Not Be Visible    ${vNExpanded}
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}    4s
    Click Element                    css:body
    Element Should Be Visible        ${vNExpanded}


