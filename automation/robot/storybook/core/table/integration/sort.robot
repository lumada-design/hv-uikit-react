*** Setting ***
Library           SeleniumLibrary
Resource          ../table.resource
Suite Setup       open storybook
Test Setup        Run Keywords
...               Go To    ${iframe_clientSide}
...               AND    Wait Until Element Is Visible    ${table}    10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${ascending_values_2}    Title,Event 5,Event 6,Event 7,Event 8,Event 9
${ascending_values}      Title,Event 1,Event 1,Event 2,Event 3,Event 4
${column_2}              css:[id$=column-name]
${unsorted_values}       css:[id$=column-name]


*** Test Cases ***
keep same number rows per page when column is sorted
    [Documentation]    sort by vs page size
    Page Should Contain Element    ${rows_populated}    limit=10
    Click Element                  ${header_2}
    Page Should Contain Element    ${rows_populated}    limit=10

keep same data sort when number of rows per table is changed
    [Documentation]    sort by vs table size
    Click Element                        ${header_2}
    Select From List By Value            ${rows_per_page}         5
    Element Attribute Value Should Be    ${header_2}    aria-sort    ascending
    elements text should be              ${column_2}    ${ascending_values}

keep same data sort when pagination is moved to next page
    [Documentation]    sort by vs pagination
    Click Element                        ${header_2}
    Click Element                        ${pagination_next_page}
    Element Attribute Value Should Be    ${header_2}    aria-sort    ascending
    elements text should be              ${column_2}    Title,Event 10,Event 11,Event 12

show first table page when a column is sorted
    [Documentation]    sort by vs pagination
    Click Button                                ${pagination_next_page}
    Wait Until Element Is Enabled               ${header_2}     3s
    Click Element                               ${header_2}
    Wait Until Page Does Not Contain Element    ${pagination_first_page}:enabled    5s
    Textfield Value Should Be                   ${pagination_input}    1

keep same data sort when pagination is moved to previous page
    [Documentation]    sort by vs page size
    Click Element                ${header_2}
    Select From List By Value    ${rows_per_page}    5
    Click Element                ${pagination_next_page}
    elements text should be      ${column_2}    ${ascending_values_2}
    Click Element                ${pagination_previous_page}
    elements text should be      ${column_2}    ${ascending_values}

header tab: change focus to next sortable column header after clicking a sortable column
    Click Element                ${header_2}
    Press Keys                   None                               TAB
    Element Should Be Focused    ${header_3} [role=button]
