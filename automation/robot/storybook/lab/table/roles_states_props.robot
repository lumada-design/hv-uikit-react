*** Setting ***
Resource         _table.resource
Test Setup    open table sample    ${lab}    kitchen-sink-sample
Force Tags       wai-aria-practices
Documentation    https://www.w3.org/TR/wai-aria-practices/#table


*** Test Cases ***
table is rendered with the correct a11y role
    Element Attribute Value Should Be    ${table}    role    table
    Page Should Contain Element          css:[role=table]    limit=1

table contain a single table caption
    Element Attribute Value Should Be    ${table}    caption    Table Caption
    Page Should Contain Element          css:[aria-rowcount]    limit=1

columnheader role is correctly applied when table is rendered
    Element Attribute Value Should Be    ${headers}    role    columnheader
    Page Should Contain Element          css:[role=columnheader]    limit=8

aria-rowcount as total number of table rows on correct tag when a paginated table is rendered
    Element Attribute Value Should Be    ${table}    aria-rowcount    64
    Page Should Contain Element          css:[aria-rowcount]    limit=1
    Select Dropdown Value                ${rows_per_page}    5
    Element Attribute Value Should Be    ${table}    aria-rowcount    64

rows contain the correct a11y when a paginated table is rendered
    Element Attribute Value Should Be    ${rows_populated}    role    row
    Page Should Contain Element          ${rows_populated}    limit=10
    Click Button                         ${nav_next_page}
    Page Should Contain Element          ${rows_populated}    limit=10

cells contain the correct a11y role when a paginated table is rendered
    Element Attribute Value Should Be    ${cells}    role    cell
    Page Should Contain Element          css:[role=cell]    limit=80
    Click Button                         ${nav_next_page}
    Page Should Contain Element          css:[role=cell]    limit=80
    Select Dropdown Value                ${rows_per_page}    5
    Page Should Contain Element          css:[role=cell]    limit=40

aria-sort property is correctly applied when a column is sorted
    Element Attribute Value Should Be    ${header}(8)    aria-sort    none
    Click Element                        ${header}(8)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    ascending
    Click Element                        ${header}(8)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    descending
    Click Element                        ${header}(2)
    Element Attribute Value Should Be    ${header}(8)    aria-sort    none
