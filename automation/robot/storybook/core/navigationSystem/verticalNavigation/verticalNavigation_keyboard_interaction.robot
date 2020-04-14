*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=coreverticalnavigation--collapsable    ${vnBurger}     10s
Test Teardown     Run Keyword If Test Failed                      Capture Page Screenshot    ${SUITE_NAME}.png
Force Tags        smoke    keyboard    bug-infrastructure-ie
Documentation     Test Cases based on Design System Version 1.2.0

                
*** Test Cases ***
tab: change focus to next item and keep item selection when press TAB on item
    Click Element                                  ${vnBurger}
    Wait Until Element Is Visible                  ${vNExpanded}       4s
    vertical navigation item should be selected    ${vnItem2.3.2}
    set focus and press keys                       ${vNExpanded}       TAB    TAB
    Element Should Be Focused                      ${vnItem1.1}>div
    vertical navigation item should be selected    ${vnItem2.3.2}

shift + tab: change focus to previous item and keep item selection when press SHIFT + TAB on item
    Click Element                                  ${vnBurger}
    Wait Until Element Is Visible                  ${vNExpanded}       4s
    vertical navigation item should be selected    ${vnItem2.3.2}
    set focus and press keys                       ${vNExpanded}       TAB          TAB
    Element Should Be Focused                      ${vnItem1.1}>div
    Press Keys                                     NONE                SHIFT+TAB
    Element Should Be Focused                      ${vnItem1}>div
    vertical navigation item should be selected    ${vnItem2.3.2}

shift + tab: change focus to previous item when previous click an item and then press SHIFT + TAB on item
    [Tags]    distinct    run-any-way
    [Documentation]   = Browsers Distinct behavior, not supported by UIKIT  = \n
    ...                 *https://github.com/pentaho/hv-uikit-react/issues/1124*    
    ...                - *chrome* - focus the previous item
    ...                - *firefox* - focus the current item
    ...                - *ie* - focus last element on navigation
    Click Element                    ${vnBurger}
    Wait Until Element Is Visible    ${vNExpanded}                      4s
    Click Element                    ${vnItem2.3.2}
    Press Keys                       NONE                               SHIFT+TAB
    Run Keyword If                   '${BROWSER.lower()}'=='chrome'     Element Should Be Focused    ${vnItem2.3.1}>div
    Run Keyword If                   '${BROWSER.lower()}'=='firefox'    Element Should Be Focused    ${vnItem2.3.2}>div
    Run Keyword If                   '${BROWSER.lower()}'=='ie'         Element Should Be Focused    ${vnAction3}

enter: select an item when press ENTER on focused item
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s
    vertical navigation item should not be selected    ${vnItem1}
    set focus and press keys                           ${vNExpanded}     TAB
    Element Should Be Focused                          ${vnItem1}>div
    Press Keys                                         NONE              ENTER
    vertical navigation item should be selected        ${vnItem1}

space: select an item when press SPACE on focused item
    Click Element                                      ${vnBurger}
    Wait Until Element Is Visible                      ${vNExpanded}     4s
    set focus and press keys                           ${vNExpanded}     TAB
    vertical navigation item should not be selected    ${vnItem1}
    Element Should Be Focused                          ${vnItem1}>div
    Press Keys                                         NONE              SPACE
    vertical navigation item should be selected        ${vnItem1}