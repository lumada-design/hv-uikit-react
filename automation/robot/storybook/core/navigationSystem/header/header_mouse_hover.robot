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


*** Test Cases ***
change item background color when mouse hover item and then mouse out of item
    ${color}                                get css property value    ${hItem1}>div      background-color
    Mouse Over                              ${hItem1}
    wait until css attribute not contain    ${hItem1}>div          background-color      ${color}
    Mouse Over                              css:body
    wait until css attribute contain        ${hItem1}>div          background-color      ${color}

maintains item "mouse hover background color" when mouse hover on child items
    [Tags]    bug-ie-webdriver
    ${color}                                get css property value    ${hItem1}>div      background-color
    Mouse Over                              ${hItem1}
    wait until css attribute not contain    ${hItem1}>div          background-color      ${color}
    ${colorHover}                           get css property value    ${hItem1}>div      background-color
    Mouse Over                              ${hItem1.2}
    wait until css attribute contain        ${hItem1}>div          background-color      ${colorHover}
    wait until css attribute contain        ${hItem1.2}>div        background-color      ${colorHover}

change child item background color when mouse hover and then out of child item
    Mouse Over                              ${hBrand}
    ${color}                                get css property value    ${hItem3.1}>div     background-color
    Mouse Over                              ${hItem3.1}
    wait until css attribute not contain    ${hItem3.1}>div           background-color    ${color}
    Mouse Over                              ${hItem3.2}
    wait until css attribute contain        ${hItem3.1}>div           background-color    ${color}
    
