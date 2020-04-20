*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=components-navigation-system-vertical-navigation--collapsable    ${vnBurger}     10s
Test Teardown     Run Keyword If Test Failed                      Capture Page Screenshot    ${SUITE_NAME}.png
Force Tags        smoke
Documentation     Test Cases based on Design System Version 1.2.0


*** Test Cases ***
should be selected the default item when vertical navigation menu is opened
    Click Element                                  ${vnBurger}
    Wait Until Element Is Visible                  ${vNExpanded}     4s
    vertical navigation item should be selected    ${vnItem2.3.2}

save previous selection when vertical navigation menu is closed and then opened
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s
    vertical navigation item should not be selected    ${vnItem2.3.1}
    Click Element                                      ${vnItem2.3.1}
    vertical navigation item should be selected        ${vnItem2.3.1}
    Click Element                                      ${vnBurger}
    Wait Until Element Is Not Visible                  ${vNExpanded}     4s
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s
    vertical navigation item should be selected        ${vnItem2.3.1}

select a parent item when item is clicked (1 level)
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s    
    vertical navigation item should not be selected    ${vnItem2}
    Click Element                                      ${vnItem2}>div
    vertical navigation item should be selected        ${vnItem2}

select a parent item when item is clicked (2 level)
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s    
    vertical navigation item should not be selected    ${vnItem2.2}
    Click Element                                      ${vnItem2.2}>div
    vertical navigation item should be selected        ${vnItem2.2}

select a end item when item is clicked (3 level)
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s    
    vertical navigation item should not be selected    ${vnItem2.3.1}
    Click Element                                      ${vnItem2.3.1}>div
    vertical navigation item should be selected        ${vnItem2.3.1}

doesn't select an item when the item is focused
    [Tags]    bug-infrastructure-ie
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s
    set focus and press keys                           ${vNExpanded}     TAB
    Element Should Be Focused                          ${vnItem1}>div
    vertical navigation item should not be selected    ${vnItem1}

doesn't unselect an item when the selected item is clicked
    Click Element                                  ${vnBurger}
    Wait Until Element Is Visible                  ${vNExpanded}     4s
    vertical navigation item should be selected    ${vnItem2.3.2}
    Click Element                                  ${vnItem2.3.2}
    vertical navigation item should be selected    ${vnItem2.3.2}