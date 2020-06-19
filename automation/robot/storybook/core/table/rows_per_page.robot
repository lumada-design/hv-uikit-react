*** Setting ***
Resource          table.resource
Suite Setup       open storybook
Test Template     show correct rows and pages when rows per page is changed
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***    url    rows per page    rows populated    number of pages
client side select 5 rows per page      ${visualizations}table--with-checkbox    5     5     3
client side select 10 rows per page     ${visualizations}table--with-checkbox    10    10    2
client side select 20 rows per page     ${visualizations}table--with-checkbox    20    13    1
client side select 50 rows per page     ${visualizations}table--with-checkbox    50    13    1
client side select 100 rows per page    ${visualizations}table--with-checkbox    100   13    1
server side select 5 rows per page      ${visualizations}table--server-side-pagination    5     5     111
server side select 10 rows per page     ${visualizations}table--server-side-pagination    10    10    56
server side select 20 rows per page     ${visualizations}table--server-side-pagination    20    20    28
server side select 25 rows per page     ${visualizations}table--server-side-pagination    25    25    23
server side select 50 rows per page     ${visualizations}table--server-side-pagination    50    50    12
server side select 100 rows per page    ${visualizations}table--server-side-pagination    100   100   6


*** Keywords ***
show correct rows and pages when rows per page is changed
    [Arguments]    ${url}    ${rows_per_page_value}    ${populated_rows_value}    ${number_of_pages_value}
    Go To                               ${url}
    Wait Until Element Is Enabled       ${rows_per_page}    timeout=10s
    Select From List By Value           ${rows_per_page}    ${rows_per_page_value}
    wait until page contains elements   ${rows_populated}   ${populated_rows_value}
    Page Should Contain Element         ${rows_counted}    limit=${rows_per_page_value}
    elements text should be             ${pagination_count_of_pages}    ${number_of_pages_value}
