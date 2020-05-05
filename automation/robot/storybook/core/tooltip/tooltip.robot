*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        open tooltip sample
Suite Teardown    Close Browser
Force Tags        smoke


*** Comments ***
    an ie and firefox webdriver issue was found:
    - with repeated 'mouse hover' actions the react event handler does not trust them.
    similar as: https://github.com/SeleniumHQ/selenium/issues/6741


*** Test Cases ***
tooltip is triggered and when mouse hover item
    Page Should Not Contain     Tooltips can showcase
    Mouse Over                  ${tooltipPlaceholder}
    Wait Until Page Contains    Tooltips can showcase    3s

tooltip is triggered when item is focused
    [Tags]    keyboard
    Page Should Not Contain     Tooltips can showcase
    Press Keys                  ${placeholder}          TAB
    Wait Until Page Contains    Tooltips can showcase   5s

tooltip is dismissed when mouse leaves touch target
    [Tags]    keyboard
    Press Keys                          ${placeholder}           TAB
    Wait Until Page Contains            Tooltips can showcase    5s
    Mouse Out                           ${tooltipPlaceholder}
    Wait Until Page Does Not Contain    Tooltips can showcase    3s

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard
    Mouse Over                          ${tooltipPlaceholder}
    Wait Until Page Contains            Tooltips can showcase    5s
    Press Keys                          ${tooltipPlaceholder}    TAB
    Wait Until Page Does Not Contain    Tooltips can showcase    3s


*** Variables ***
${tooltipPlaceholder}   css:p[class*=HvTypography-root]
${placeholder}          css:body


*** Keywords ***
open tooltip sample
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-tooltip--long-text
    Wait Until Element Is Visible    ${tooltipPlaceholder}    10s
