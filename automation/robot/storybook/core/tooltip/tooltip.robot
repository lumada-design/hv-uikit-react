*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        open tooltip sample
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${tooltipPlaceholder}    css:button>p
${contextDiv}            xpath://div[button/p]

*** Keywords ***
open tooltip sample
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
    Wait Until Element Is Visible    ${tooltipPlaceholder}    10s
   

*** Test Cases ***
tooltip is triggered and when mouse hover item
    Page Should Not Contain     Tooltips can showcase
    Mouse Over                  ${tooltipPlaceholder}
    Wait Until Page Contains    Tooltips can showcase    3s

tooltip is triggered when item is focused
    [Tags]    keyboard    bug-infrastructure-ie
    Page Should Not Contain     Tooltips can showcase
    Press Keys                  ${contextDiv}            TAB
    Wait Until Page Contains    Tooltips can showcase    5s

tooltip is dismissed when mouse leaves touch target
    # verified firefox webdriver error if this test case is precedent of first Test case
    Mouse Over                          ${tooltipPlaceholder}
    Wait Until Page Contains            Tooltips can showcase    5s
    Mouse Out                           ${tooltipPlaceholder}
    Wait Until Page Does Not Contain    Tooltips can showcase    3s

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard
    Mouse Over                          ${tooltipPlaceholder}
    Wait Until Page Contains            Tooltips can showcase    5s
    Press Keys                          ${tooltipPlaceholder}    TAB
    Wait Until Page Does Not Contain    Tooltips can showcase    3s