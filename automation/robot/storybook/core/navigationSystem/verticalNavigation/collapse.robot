*** Setting ***
Library           SeleniumLibrary
Resource          _verticalNavigation.resource
Suite Setup       open storybook    ${iframeCollapsable}
Test Setup        Run Keywords
...               Go To    ${iframeCollapsable}    AND
...               expand vertical navigation
Suite Teardown    Close Browser
Force Tags        smoke
Documentation     Test Cases based on Design System Version 1.2.0


*** Comments ***
complementary test cases:
- Test Suite "verticalNavigation_keyboard_interaction.robot"
- Test Case "escape: close vertical navigation menu when ESCAPE is pressed"


*** Test Cases ***
expand vertical navigation menu when burger is clicked
    Wait Until Element Is Visible    ${expanded}    4s

close vertical navigation menu when it id opened and burger is clicked
    Click Element                        ${burger}
    Wait Until Element Is Not Visible    ${expanded}    4s

does not close vertical anchor bar when vertical navigation menu is closed
    Click Element                        ${burger}
    Wait Until Element Is Not Visible    ${expanded}     4s
    Element Should Be Visible            ${anchorBar}

closeOnExit property close menu when is clicked any area out of vertical navigation
    [Setup]    NONE
    Go To                                ${iframeExit}
    expand vertical navigation
    Click Element                        css:body
    Wait Until Element Is Not Visible    ${items}     4s

by default does not close menu when is clicked any area out of vertical navigation
    Click Element                css:body
    Element Should Be Visible    ${expanded}
