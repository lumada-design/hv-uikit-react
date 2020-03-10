*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tablesimple    ${input_page}    10s
Test Teardown     Run Keyword If Test Failed                     Capture Page Screenshot    ${SUITE_NAME}.png
Suite Teardown    Close Browser
Force Tags        smoke

*** Comments ***
don't was possible use selenium keywords for table because this component don't has a table semantic. 


*** Test Cases ***
sort column by ascending when header is clicked and column is not sorted
    elements text should be              ${priority_cells}    Priority,Critical,Critical,High,Critical,Medium,Critical,High,Critical,Low,Medium
    Click Element                        ${column7_header}
    elements text should be              ${priority_cells}    Priority,Critical,Critical,Critical,Critical,Critical,Critical,Critical,High,High,High

sort column by ascending when header is clicked and column is sorted by descending
    elements text should be              ${title_cells}       Title,Event 12,Event 11,Event 10,Event 9,Event 8,Event 7,Event 6,Event 5,Event 4,Event 3
    Click Element                        ${column1_header}
    elements text should be              ${title_cells}       Title,Event 1,Event 1,Event 2,Event 3,Event 4,Event 5,Event 6,Event 7,Event 8,Event 9

sort column by descending when header is clicked and column is sorted by ascending
    Click Element                        ${column1_header}
    elements text should be              ${title_cells}       Title,Event 1,Event 1,Event 2,Event 3,Event 4,Event 5,Event 6,Event 7,Event 8,Event 9
    Click Element                        ${column1_header}
    elements text should be              ${title_cells}       Title,Event 12,Event 11,Event 10,Event 9,Event 8,Event 7,Event 6,Event 5,Event 4,Event 3

keep correct row data when a column is sorted
    Element Text Should Be               ${row_1}             Event 12\n10/14/2018\nAnomaly Detection\nOpen\n98%\nCritical\nCritical\nAsset 1
    Click Element                        ${column1_header}
    Element Text Should Be               ${row_1}             Event 1\n10/14/2018\nAnomaly Detection Ssssssssssssssssssssssssssssssssssssssssssssssssssss\nOpen\n98%\nCritical\nCritical\nAsset 1

keep same number rows per page when column is sorted
    Page Should Contain Element    ${rows}            limit=10
    Click Element                  ${column1_header}   
    Page Should Contain Element    ${rows}            limit=10
    
keep same data sort when number of rows per table is changed 
    Click Element                        ${column1_header}
    Select From List By Value            ${page_size}         5
    Element Attribute Value Should Be    ${column1_header}    aria-sort    ascending
    elements text should be              ${title_cells}       Title,Event 1,Event 1,Event 2,Event 3,Event 4

keep same data sort when pagination is moved to next page
    Click Element                        ${column1_header}
    Click Element                        ${next_page}
    Element Attribute Value Should Be    ${column1_header}    aria-sort    ascending
    elements text should be              ${title_cells}       Title,Event 10,Event 11,Event 12
    
keep same data sort when pagination is moved to previous page
    Click Element                ${column1_header}
    Select From List By Value    ${page_size}         5
    Click Element                ${next_page}
    elements text should be      ${title_cells}       Title,Event 5,Event 6,Event 7,Event 8,Event 9
    Click Element                ${previous_page}
    elements text should be      ${title_cells}       Title,Event 1,Event 1,Event 2,Event 3,Event 4
    
do not sort a column when column is not sortable
    elements text should be    ${priority_cells}    Priority,Critical,Critical,High,Critical,Medium,Critical,High,Critical,Low,Medium
    Click Element              ${column8_header}
    elements text should be    ${priority_cells}    Priority,Critical,Critical,High,Critical,Medium,Critical,High,Critical,Low,Medium
