*** Setting ***
Resource      _keywords.resource
Test Setup    Run Keywords
...           Go To    ${components}asset-inventory--configurations
...           AND    Wait Until Element Is Enabled    hv-assetinventory


*** Test Cases ***
select, search and sort
    Select Checkbox                ${checkBox4}
    Input Text                     ${searchBox}    Track
    Click Element                  ${dropdownHeader}
    Click Element                  ${sortTitleDesc}
    Checkbox Should Be Selected    ${checkBox3}

search, select, list view, select, paginate and card view
    Input Text                         ${searchBox}    Track
    Select Checkbox                    ${checkBox4}
    Click Element                      ${listViewButton}
    Select Checkbox                    ${checkBox1}
    Click Element                      ${pageNext}
    Checkbox Should Not Be Selected    ${checkBox1}
    Click Element                      ${cardViewButton}
    Click Element                      ${pagePrevious}
    Checkbox Should Be Selected        ${checkBox1}
    Checkbox Should Be Selected        ${checkBox4}

pageSize, select, sort and paginate
    Select Checkbox                ${checkBox1}
    Click Element                  ${dropdownHeader}
    Click Element                  ${sortTitleDesc}
    Select From List By Label      ${pageSize}    2
    Click Element                  ${pageLast}
    Checkbox Should Be Selected    ${checkBox2}

change page size with filtered results
    [Documentation]    traceability:
    ...                bug https://insightgroup.atlassian.net/browse/HVUIKIT-5549
    [Setup]    NONE
    Go To                               ${components}asset-inventory--server-side-pagination
    Wait Until Element Is Enabled       ${searchBox}
    Input Text                          ${searchBox}    Risk of downtime 1
    Select From List By Label           ${pageSize}   6
    wait Until Page Contains Element    ${cards}   limit=6
    Select From List By Label           ${pageSize}   8
    List Selection Should Be            ${pageSize}   8

change page size with filtered results on other page
    [Setup]    NONE
    Go To                               ${components}asset-inventory--server-side-pagination
    Wait Until Element Is Enabled       ${searchBox}
    Input Text                          ${searchBox}    Risk of downtime 1
    Click Element                       ${nextPage}
    wait Until Page Contains Element    ${cards}    limit=2
    Select From List By Label           ${pageSize}   8
    wait Until Page Contains Element    ${cards}    limit=6

change page size with filtered results on last page
    [Setup]    NONE
    Go To                               ${components}asset-inventory--server-side-pagination
    Wait Until Element Is Enabled       ${searchBox}
    Input Text                          ${searchBox}    Risk of downtime 1
    Select From List By Label           ${pageSize}    2
    Click Element                       ${lastPage}
    Select From List By Label           ${pageSize}    4
    List Selection Should Be            ${pageSize}    4
    Element Text Should Be              ${pageInTotal}    2


*** Variables ***
${assetInventory}    css:.HvAssetInventory-root
${cards}             css:#card>div
${lastPage}          css:button[aria-label="Last Page"]
${nextPage}          css:button[aria-label="Next Page"]
${pageInTotal}       css:.HvPagination-pageInfo>:nth-child(3)
