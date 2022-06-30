*** Setting ***
Resource      ../_keywords.resource
Suite Setup   Run Keywords
...           Go To    ${overlay}tooltip--long-text    AND
...           Wait Until Element Is Visible    ${tooltipPlaceholder}
Test Teardown     Double Click Element     css:body
Force Tags    bug-ie-webdriver


*** Comments ***
1 - bug-ie-webdriver, documentation explicit it as a current issue unresolved (hovering over
    Elements) although we experience with sucess running it on local machine.
    https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#hovering-over-elements

2 - react event handler does not trust when actions "mouse hover are repeated, using Firefox or IE
    similar: https://github.com/SeleniumHQ/selenium/issues/6741


*** Test Cases ***
tooltip is triggered and when mouse hover item
    Page Should Not Contain     Tooltips can showcase
    Mouse Over                  ${tooltipPlaceholder}
    Wait Until Page Contains    Tooltips can showcase

tooltip is dismissed when mouse leaves touch target
    [Tags]    keyboard
    Press Keys                          ${placeholder}    TAB
    Wait Until Page Contains            Tooltips can showcase
    Mouse Out                           ${tooltipPlaceholder}
    Wait Until Page Does Not Contain    Tooltips can showcase

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard
    Mouse Over                          ${tooltipPlaceholder}
    Wait Until Page Contains            Tooltips can showcase
    Press Keys                          ${tooltipPlaceholder}    TAB
    Wait Until Page Does Not Contain    Tooltips can showcase

tooltip is triggered when item is focused
    [Tags]    keyboard
    Page Should Not Contain     Tooltips can showcase
    Press Keys                  ${placeholder}          TAB
    Wait Until Page Contains    Tooltips can showcase   5s


*** Variables ***
${tooltipPlaceholder}   css:p[class*=HvTypography-root]
${placeholder}          css:body
