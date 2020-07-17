*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${components}tooltip--long-text    AND
...           Wait Until Element Is Visible    ${tooltipPlaceholder}
Force Tags    bug-infrastructure-ie


*** Comments ***
    an ie and firefox webdriver issue was found:
    - with repeated 'mouse hover' actions the react event handler does not trust them.
    similar as: https://github.com/SeleniumHQ/selenium/issues/6741


*** Variables ***
${tooltipPlaceholder}   css:p[class*=HvTypography-root]
${placeholder}          css:body


*** Test Cases ***
tooltip is triggered and when mouse hover item
    Page Should Not Contain     Tooltips can showcase
    Mouse Over                  ${tooltipPlaceholder}
    Wait Until Page Contains    Tooltips can showcase

tooltip is triggered when item is focused
    [Tags]    keyboard
    Page Should Not Contain     Tooltips can showcase
    Press Keys                  ${placeholder}          TAB
    Wait Until Page Contains    Tooltips can showcase   5s

tooltip is dismissed when mouse leaves touch target
    [Tags]    keyboard
    Press Keys                          ${placeholder}           TAB
    Wait Until Page Contains            Tooltips can showcase
    Mouse Out                           ${tooltipPlaceholder}
    Wait Until Page Does Not Contain    Tooltips can showcase

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard
    Mouse Over                          ${tooltipPlaceholder}
    Wait Until Page Contains            Tooltips can showcase
    Press Keys                          ${tooltipPlaceholder}    TAB
    Wait Until Page Does Not Contain    Tooltips can showcase
