*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=core-newheader--two-levels    ${hItem3}            10s
Test Teardown     Run Keyword If Test Failed                      Capture Page Screenshot    ${SUITE_NAME}.png
Force Tags        smoke
Documentation     Test Cases based on Design System Version 1.2.0 


*** Comments ***
 note1:  work around, keywords for sync will not work (dev implementation keep items always visible and enabled)
         the click element fails with error 'other element will receive the click', so the solution was try until succeed


*** Test Cases ***   
select a item when click on item that has no child items (final item)
    header item should not be selected    ${hItem4}
    Click Element                         ${hItem4}
    header item should be selected        ${hItem4}
    
select a item and the child item when user click on a child item
    header item should not be selected    ${hItem1}
    Mouse Over                            ${hItem1}
    Wait Until Keyword Succeeds           3x             1s    Click Element    ${hItem1.2}    #note1
    header item should be selected        ${hItem1}
    header item should be selected        ${hItem1.2}

select other child item of other item when a child item is selected
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    mouse over                        ${hItem5}
    Wait Until Keyword Succeeds       3x             1s    Click Element    ${hItem5.1}    #note1
    header item should be selected    ${hItem5.1}
    header item should be selected    ${hItem5}
    Element Text Should Be            ${hItem5.1}    Model Effectiveness 5-1
    
select other child item of same item when a child item is selected
    header item should be selected        ${hItem3}
    Mouse Over                            ${hItem3}
    header item should be selected        ${hItem3.2}
    Wait Until Keyword Succeeds           3x             1s    Click Element    ${hItem3.1}
    header item should be selected        ${hItem3}
    header item should be selected        ${hItem3.1}
    header item should not be selected    ${hItem3.2}

select an item when click on an item that has child items (not final item)
    header item should not be selected    ${hItem1}
    Click Element                         ${hItem1}
    header item should be selected        ${hItem1}

does not select an item when mouse hover item or child item
    header item should be selected        ${hItem3}
    header item should be selected        ${hItem3.2}
    mouse over                            ${hItem5}
    header item should not be selected    ${hItem5}
    mouse over                            ${hItem4}
    header item should not be selected    ${hItem4}
    header item should be selected        ${hItem3}
    header item should be selected        ${hItem3.2}

unselect an item when click on other item
    header item should be selected        ${hItem3}
    header item should be selected        ${hItem3.2}
    mouse over                            ${hItem5}
    Wait Until Keyword Succeeds           3x             1s    Click Element    ${hItem5.1}    #note1
    header item should be selected        ${hItem5}
    header item should not be selected    ${hItem3}
    header item should not be selected    ${hItem3.2}

