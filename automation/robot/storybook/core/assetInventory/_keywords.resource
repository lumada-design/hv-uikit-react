*** Setting ***
Library     SeleniumLibrary
Resource    ../../_resources/storybook_keywords.robot
Resource    _variables.resource


*** Keywords ***
filter cards and reduce Window size
    Set Window Size                  1200    800
    Go To                            ${iframeConfigurations}
    Wait Until Element Is Enabled    ${searchBox}    10s
    Select From List By Label        ${pageSize}    6

move focus from-to locator when pressed keyboard
    [Arguments]    ${fromCard}    ${keyboard}    ${toCard}
    Click Element                ${fromCard}
    Press Keys                   ${fromCard}    ${keyboard}
    Element Should Be Focused    ${toCard}

validate page size
    [Arguments]    ${items}    ${size}    ${numItems}    ${numpages}
    Page Should Contain Element    ${items}    limit=4
    Select From List By Value      ${pageSize}    ${size}
    Page Should Contain Element    ${items}    limit=${numItems}
    Element Text Should Be         ${pageTotal}    ${numpages}
