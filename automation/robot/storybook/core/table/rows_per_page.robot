*** Setting ***
Resource          _table.resource
Test Template     show correct rows and pages when rows per page is changed
Documentation     selection of rows per page


*** Test Cases ***        sample   per page    populated    nº pages
client side - 5 rows      with-checkbox             5     5     3
client side - 10 rows     with-checkbox             10    10    2
client side - 20 rows     with-checkbox             20    13    1
client side - 50 rows     with-checkbox             50    13    1
client side - 100 rows    with-checkbox             100   13    1
server side - 5 rows      server-side-pagination    5     5     111
server side - 10 rows     server-side-pagination    10    10    56
server side - 20 rows     server-side-pagination    20    20    28
server side - 25 rows     server-side-pagination    25    25    23
server side - 50 rows     server-side-pagination    50    50    12
server side - 100 rows    server-side-pagination    100   100   6


*** Keywords ***
show correct rows and pages when rows per page is changed
    [Arguments]    ${sample}    ${per_page}    ${populated}    ${pages}
    open table sample                    ${display}    ${sample}
    Select Dropdown Value                ${rows_per_page}    ${per_page}
    Wait Until Page Contains Element     ${rows_populated}    timeout=5s    limit=${populated}
    Page Should Contain Element          ${rows}    limit=${per_page}
    elements text should be              ${nav_count_of_pages}    ${pages}
