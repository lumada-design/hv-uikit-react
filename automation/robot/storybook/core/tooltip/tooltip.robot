*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${tooltipPlaceholder}    xpath://p[contains(.,'Hover here')]
${tooltip}               css:div[id|='mui-tooltip']
*** Test Cases ***


tooltip is triggered when mouse hover item
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
    Wait Until Element Is Enabled    ${tooltipPlaceholder}    10s
    Element Should Not Be Visible    ${tooltip}               2s
    Mouse Over                       ${tooltipPlaceholder}
    Wait Until Element Is Visible    ${tooltip}               5s

tooltip is dismissed when mouse leaves touch target
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
    Wait Until Element Is Enabled        ${tooltipPlaceholder}    10s
    Click Element                        ${tooltipPlaceholder}
    Wait Until Element Is Visible        ${tooltip}               5s
    Mouse Out                            ${tooltipPlaceholder}
    Wait Until Element Is Not Visible    ${tooltip}               2s

tooltip is triggered when item is focused
    [Tags]    keyboard    bug-infrastructure-ie
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
    Wait Until Element Is Enabled        ${tooltipPlaceholder}    10s
    Element Should Not Be Visible        ${tooltip}
    Press Keys                           css:button               TAB
    Wait Until Element Is Visible        ${tooltip}               5s
    Press Keys                           ${tooltip}               TAB
    Wait Until Element Is Not Visible    ${tooltip}               2s

tooltip is dismissed when is removed the item focus
    [Tags]    keyboard    bug-infrastructure-ie
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretooltip--tooltip2
    Wait Until Element Is Enabled        ${tooltipPlaceholder}    10s
    Element Should Not Be Visible        ${tooltip}               2s
    Mouse Over                           ${tooltipPlaceholder}
    Wait Until Element Is Visible        ${tooltip}               5s
    Press Keys                           ${tooltipPlaceholder}    TAB
    Wait Until Element Is Not Visible    ${tooltip}               2s