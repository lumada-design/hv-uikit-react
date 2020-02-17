*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=core-newheader--two-levels    ${hItem3}            10s
Test Teardown     Run Keyword If Test Failed    Capture Page Screenshot        TearDown.png
Force Tags        smoke    keyboard
Documentation    Test Cases based on Design System Version 1.2.0


*** Test Cases ***
tab: change focus to next item and keep item selection when is pressed TAB
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    Click Element                     ${hBrand}
    verify element is not focused     ${hItem1}>div
    Press Keys                        ${None}            TAB
    Element Should Be Focused         ${hItem1}>div
    Press Keys                        ${None}            TAB
    Element Should Be Focused         ${hItem1.1}>div
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}

shift + tab: change focus to previous item and keep item selection when is pressed SHIFT + TAB
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    Click Element                     ${hBrand}
    Press Keys                        ${None}            TAB          TAB
    Element Should Be Focused         ${hItem1.1}>div
    Press Keys                        ${None}            SHIFT+TAB
    Element Should Be Focused         ${hItem1}>div
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}

shift + tab: change focus to previous item when is pressed SHIFT + TAB on previous clicked item
    [Tags]    distinct    run-any-way
    [Documentation]   = Browsers Distinct behavior, not supported by UIKIT  = \n
    ...               *https://github.com/pentaho/hv-uikit-react/issues/1124*
    ...                - *chrome* - focus the previous item
    ...                - *firefox* - focus the current item
    ...                - *ie* - focus last element on navigation
    verify element is not focused    ${hItem3.1}>div
    Mouse Over                       ${hItem3}
    Click Element                    ${hItem3.2}
    Press Keys                       ${None}                       SHIFT+TAB
    Run Keyword If                   '${BROWSER.lower()}'=='ie'    Element Should Be Focused    ${hAction2}
    ...                              ELSE                          Element Should Be Focused    ${hItem3.2}>div

enter: select a parent item when item is focused and is pressed ENTER
    header item should not be selected    ${hItem1}
    Click Element                         ${hBrand}
    Press Keys                            ${None}          TAB
    Element Should Be Focused             ${hItem1}>div
    Press Keys                            ${None}          ENTER
    header item should be selected        ${hItem1}

space: select the parent and child items when child item is focused and is pressed SPACE
    header item should not be selected    ${hItem1.1}
    Click Element                         ${hBrand}
    Press Keys                            ${None}            TAB      TAB
    Element Should Be Focused             ${hItem1.1}>div
    Press Keys                            ${None}            SPACE
    header item should be selected        ${hItem1.1}

focus: keep item focused when is pressed ENTER or SPACE
    header item should not be selected    ${hItem1}
    Click Element                         ${hBrand}
    Press Keys                            ${None}          TAB
    Element Should Be Focused             ${hItem1}>div
    Press Keys                            ${None}          ENTER
    header item should be selected        ${hItem1}
    Element Should Be Focused             ${hItem1}>div