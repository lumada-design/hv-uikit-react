*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Resource          ../keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible     ${STORYBOOK_URL}/iframe.html?id=components-navigation-system-horizontal-navigation--main    ${hItem3}            10s
Test Teardown     Run Keyword If Test Failed                      Capture Page Screenshot    ${SUITE_NAME}.png
Force Tags         smoke
Documentation     Test Cases based on Design System Version 1.2.0


*** Comments ***
dev implementation keep items always visible and enabled although human eye it is not visible.
Because of that the below test cases just can be validated on image recognition tests
- closes/hide subheader when mouse hover out of child item 
- closes/hide subheader when a child item is selected and mouse hover item that has not child items


*** Test Cases ***
maintains subheader opened and seleleted when user click on actions buttons 
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    Click Element                     ${hAction1}
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    
maintains subheader opened when mouse hover on parent item
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
    Mouse Over                        ${hItem3.1}
    header item should be selected    ${hItem3}
    header item should be selected    ${hItem3.2}
















