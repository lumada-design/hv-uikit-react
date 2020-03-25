*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook    ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
Test Setup        Run Keywords
...               Reload Page                      AND
...               Wait Until Element Is Enabled    ${tooltipPlaceholder}    10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${tooltipPlaceholder}    xpath://p[contains(.,'Hover here')]
${tooltip}               css:div[id|='mui-tooltip']


*** Test Cases ***
tooltip is triggered when mouse hover item
    Element Should Not Be Visible    ${tooltip}
    Mouse Over                       ${tooltipPlaceholder}
    Wait Until Element Is Visible    ${tooltip}               5s

tooltip is dismissed when mouse leaves touch target
    Click Element                        ${tooltipPlaceholder}
    Wait Until Element Is Visible        ${tooltip}               5s
    Mouse Out                            ${tooltipPlaceholder}
    Wait Until Element Is Not Visible    ${tooltip}               2s

tooltip is triggered when item is focused
    [Tags]    keyboard    bug-infrastructure-ie
    Element Should Not Be Visible        ${tooltip}
    Press Keys                           css:button               TAB
    Wait Until Element Is Visible        ${tooltip}               5s
    Press Keys                           ${tooltip}               TAB
    Wait Until Element Is Not Visible    ${tooltip}               2s

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard    bug-infrastructure-ie
    Element Should Not Be Visible        ${tooltip}
    Mouse Over                           ${tooltipPlaceholder}
    Wait Until Element Is Visible        ${tooltip}               5s
    Press Keys                           ${tooltipPlaceholder}    TAB
    Wait Until Element Is Not Visible    ${tooltip}               2s