*** Setting ***
Resource    ../_keywords.resource
Resource    _variables.resource


*** Keywords ***
filter cards and reduce Window size
    Set Window Size                  1200    800
    Go To                            ${components}asset-inventory--configurations
    Wait Until Element Is Enabled    ${searchBox}
    Select From List By Label        ${pageSize}    6

move focus from-to locator when pressed keyboard
    [Arguments]    ${fromCard}    ${keyboard}    ${toCard}
    Click Element                 ${fromCard}
    Press Keys                    ${fromCard}    ${keyboard}
    focus assertion by Browser    ${toCard}

validate page size
    [Arguments]    ${items}    ${size}    ${numItems}    ${numpages}
    Page Should Contain Element    ${items}    limit=4
    Select From List By Value      ${pageSize}    ${size}
    Page Should Contain Element    ${items}    limit=${numItems}
    Element Text Should Be         ${pageTotal}    ${numpages}

focus assertion by Browser
    [Arguments]    ${locator}
    Run Keyword If                            '${BROWSER.lower()}'!='ie'
    ...   Element Should Be Focused           ${locator}
    ...   ELSE
    ...   Wait Until Page Contains Element    ${locator}\[class*=focused]
