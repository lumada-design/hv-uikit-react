*** Setting ***
Resource         _assetInventory.resource
Test Setup       open assetInventory sample    configurations
Test Template    Run Keyword


*** Test Cases ***              | pageSize | Number of Items | number of pages
card view min page size         validate card page                2     2     5
card view max page size         validate card page                10    10    1
card view decrease page size    validate non default card page    2     2     5
card view increase page size    validate non default card page    8     2     2
list view min page size         validate list page                2     2     5
list view max page size         validate list page                10    10    1
list view decrease page size    validate non default list page    2     2     5
list view increase page size    validate non default list page    8     2     2


*** Keywords ***
validate page size
    [Arguments]    ${items}    ${size}    ${numItems}    ${numpages}
    Page Should Contain Element    ${items}    limit=4
    Select Dropdown Value          ${pageSize}    ${size}
    Page Should Contain Element    ${items}    limit=${numItems}
    Element Text Should Be         ${pageTotal}    ${numpages}

validate card page
    [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element         ${buttonCardView}
    validate page size    ${cards}    ${size}    ${numItems}    ${numpages}

validate list page
    [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element         ${buttonListView}
    validate page size    ${rows}    ${size}    ${numItems}    ${numpages}

validate non default card page
   [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element                ${buttonCardView}
    Click Button                 ${pageNext}
    validate page size           ${cards}    ${size}    ${numItems}    ${numpages}
    Textfield Value Should Be    ${pageCurrent}    2

validate non default list page
   [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element                ${buttonListView}
    Click Button                 ${pageNext}
    validate page size           ${rows}    ${size}    ${numItems}    ${numpages}
    Textfield Value Should Be    ${pageCurrent}    2
