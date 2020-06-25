*** Setting ***
Resource          table.resource
Test Template     show correct rows and pages when rows per page is changed
Documentation     selection of rows per page


*** Test Cases ***        url                           per page    populated    nº pages
client side - 5 rows      ${visualizations}table--with-checkbox             5     5     3
client side - 10 rows     ${visualizations}table--with-checkbox             10    10    2
client side - 20 rows     ${visualizations}table--with-checkbox             20    13    1
client side - 50 rows     ${visualizations}table--with-checkbox             50    13    1
client side - 100 rows    ${visualizations}table--with-checkbox             100   13    1
server side - 5 rows      ${visualizations}table--server-side-pagination    5     5     111
server side - 10 rows     ${visualizations}table--server-side-pagination    10    10    56
server side - 20 rows     ${visualizations}table--server-side-pagination    20    20    28
server side - 25 rows     ${visualizations}table--server-side-pagination    25    25    23
server side - 50 rows     ${visualizations}table--server-side-pagination    50    50    12
server side - 100 rows    ${visualizations}table--server-side-pagination    100   100   6


*** Keywords ***
show correct rows and pages when rows per page is changed
    [Arguments]    ${url}    ${per_page}    ${populated}    ${pages}
    Go To                                ${url}
    Wait Until Element Is Enabled        ${rows_per_page}
    Select From List By Value            ${rows_per_page}    ${per_page}
    wait until page contains elements    ${rows_populated}    ${populated}
    Page Should Contain Element          ${rows_counted}    limit=${per_page}
    elements text should be              ${pagination_count_of_pages}    ${pages}
