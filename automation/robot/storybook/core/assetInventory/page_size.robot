*** Setting ***
Library           SeleniumLibrary
Resource          _keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        Run Keywords
...               Go To    ${iframeConfigurations}
...               AND      Wait Until Element Is Visible    hv-assetinventory    10s
Test Template     Run Keyword
Force Tags        smoke


*** Test Cases ***   | pageSize | Number of Items | number of pages
card view min page size         validate card page                2     2     5
card view max page size         validate card page                10    10    1
card view decrease page size    validate non default card page    2     2     5
card view increase page size    validate non default card page    8     2     2
list view min page size         validate list page                2     2     5
list view max page size         validate list page                10    10    1
list view decrease page size    validate non default list page    2     2     5
list view increase page size    validate non default list page    8     2     2


*** Keywords ***
validate card page
    [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element         ${cardViewButton}
    validate page size    ${cards}    ${size}    ${numItems}    ${numpages}

validate list page
    [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element         ${listViewButton}
    validate page size    ${rows}    ${size}    ${numItems}    ${numpages}

validate non default card page
   [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element                ${cardViewButton}
    Click Button                 ${pageNext}
    validate page size           ${cards}    ${size}    ${numItems}    ${numpages}
    Textfield Value Should Be    ${pageCurrent}    2

validate non default list page
   [Arguments]    ${size}    ${numItems}    ${numpages}
    Click Element                ${listViewButton}
    Click Button                 ${pageNext}
    validate page size           ${rows}    ${size}    ${numItems}    ${numpages}
    Textfield Value Should Be    ${pageCurrent}    2
