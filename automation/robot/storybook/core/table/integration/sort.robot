*** Setting ***
Resource      ../_table.resource
Test Setup    open table sample    ${components}    with-checkbox


*** Test Cases ***
keep same number rows per page when column is sorted
    [Documentation]    sort by vs page size
    Page Should Contain Element    ${rows_populated}    limit=10
    Click Element                  ${header}(2)
    Page Should Contain Element    ${rows_populated}    limit=10

keep same data sort when number of rows per table is changed
    [Documentation]    sort by vs table size
    Click Element                        ${header}(2)
    Select Dropdown Value                ${rows_per_page}         5
    Element Attribute Value Should Be    ${header}(2)    aria-sort    ascending
    elements text should be              ${column_2}    ${ascending_values}

keep same data sort when pagination is moved to next page
    [Documentation]    sort by vs pagination
    Click Element                        ${header}(2)
    Click Element                        ${nav_next_page}
    Element Attribute Value Should Be    ${header}(2)    aria-sort    ascending
    elements text should be              ${column_2}    Title,Event 10,Event 11,Event 12

show first table page when a column is sorted
    [Documentation]    sort by vs pagination
    Click Button                                ${nav_next_page}
    Wait Until Element Is Enabled               ${header}(2)
    Click Element                               ${header}(2)
    Wait Until Page Does Not Contain Element    ${nav_first_page}:enabled
    Textfield Value Should Be                   ${nav_input}    1

keep same data sort when pagination is moved to previous page
    [Documentation]    sort by vs page size
    Click Element                ${header}(2)
    Select Dropdown Value        ${rows_per_page}    5
    Click Element                ${nav_next_page}
    elements text should be      ${column_2}    ${ascending_values_2}
    Click Element                ${nav_previous_page}
    elements text should be      ${column_2}    ${ascending_values}

header tab: change focus to next sortable column header after clicking a sortable column
    Click Element                ${header}(2)
    Press Keys                   None                               TAB
    Element Should Be Focused    ${header}(3) [role=button]


*** Variables ***
${ascending_values_2}    Title,Event 5,Event 6,Event 7,Event 8,Event 9
${ascending_values}      Title,Event 1,Event 1,Event 2,Event 3,Event 4
${column_2}              css:[id$=column-name]
${unsorted_values}       css:[id$=column-name]
