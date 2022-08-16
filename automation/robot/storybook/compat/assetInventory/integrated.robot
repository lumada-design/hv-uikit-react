*** Setting ***
Resource      _assetInventory.resource
Test Setup    open assetInventory sample    configurations


*** Test Cases ***
select, search and sort
    Select Checkbox                ${checkBox}\[4]
    Input Text                     ${searchBox}    Track
    Click Element                  ${dropSortBy}
    Click Element                  ${dropSortTitleDesc}
    Checkbox Should Be Selected    ${checkBox}\[3]

search, select, list view, select, paginate and card view
    Input Text                         ${searchBox}    Track
    Select Checkbox                    ${checkBox}\[4]
    Click Element                      ${buttonListView}
    Select Checkbox                    ${checkBox}\[1]
    Click Element                      ${pageNext}
    Checkbox Should Not Be Selected    ${checkBox}\[1]
    Click Element                      ${buttonCardView}
    Click Element                      ${pagePrevious}
    Checkbox Should Be Selected        ${checkBox}\[1]
    Checkbox Should Be Selected        ${checkBox}\[4]

pageSize, select, sort and paginate
    Select Checkbox                ${checkBox}\[1]
    Click Element                  ${dropSortBy}
    Click Element                  ${dropSortTitleDesc}
    Select Dropdown Value          ${pageSize}    2
    Click Element                  ${pageLast}
    Checkbox Should Be Selected    ${checkBox}\[2]

change page size with filtered results
    [Documentation]    traceability:
    ...                bug https://insightgroup.atlassian.net/browse/HVUIKIT-5549
    [Setup]    open assetInventory sample    server-side-pagination
    Wait Until Element Is Enabled       ${searchBox}
    Input Text                          ${searchBox}    Risk of downtime 1
    Select Dropdown Value               ${pageSize}   6
    wait Until Page Contains Element    ${cards}   limit=6
    Select Dropdown Value               ${pageSize}   8
    Element Text Should Be              ${pageSize}   8

change page size with filtered results on other page
    [Setup]    open assetInventory sample    server-side-pagination
    Wait Until Element Is Enabled       ${searchBox}
    Input Text                          ${searchBox}    Risk of downtime 1
    Click Element                       ${pageNext}
    wait Until Page Contains Element    ${cards}    limit=2
    Select Dropdown Value               ${pageSize}   8
    wait Until Page Contains Element    ${cards}    limit=6

change page size with filtered results on last page
    [Setup]    open assetInventory sample    server-side-pagination
    Wait Until Element Is Enabled    ${searchBox}
    Input Text                       ${searchBox}    Risk of downtime 1
    Select Dropdown Value            ${pageSize}    2
    Click Element                    ${pageLast}
    Select Dropdown Value            ${pageSize}    4
    Element Text Should Be           ${pageSize}    4
    Element Text Should Be           ${pageInTotal}    2


*** Variables ***
${pageLast}          css:button[aria-label="Last Page"]
${pageNext}          css:button[aria-label="Next Page"]
${pageSize}          css:.HvPagination-pageSizeOptionsSelect
