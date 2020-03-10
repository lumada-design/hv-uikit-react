*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tablesimple    ${table}    10s
Test Teardown     Run Keyword If Test Failed                     Capture Page Screenshot    ${SUITE_NAME}.png
Suite Teardown    Close Browser
Force Tags        wai-aria-practices
Documentation     https://www.w3.org/TR/wai-aria-practices/#table


*** Test Cases ***
DOM contain only 1 role=table on correct tag when table is rendered
    Element Attribute Value Should Be    ${table}            role       table
    Page Should Contain Element          css:[role=table]    limit=1

DOM contain only 1 caption=string on correct tag when table is rendered
    Element Attribute Value Should Be    ${table}               caption    A Custom Table Caption
    Page Should Contain Element          css:[aria-rowcount]    limit=1

DOM contains role=columnheader on correct tags when table is rendered
    Element Attribute Value Should Be    ${columnheader}            role             columnheader
    Page Should Contain Element          css:[role=columnheader]    limit=8

DOM contain aria-rowcount=(total number of table rows) on correct tag when a paginated table is rendered
    Element Attribute Value Should Be    ${table}               aria-rowcount    13
    Page Should Contain Element          css:[aria-rowcount]    limit=1
    Select From List By Value            ${page_size}           5
    Element Attribute Value Should Be    ${table}               aria-rowcount    13

DOM contains role=row on correct tags when a paginated table is rendered
    Element Attribute Value Should Be    ${rows}         role        row
    Page Should Contain Element          ${rows}         limit=10
    Click Button                         ${next_page}
    Page Should Contain Element          ${rows}         limit=3

DOM contains role=cell on correct DOM tags when a paginated table is rendered
    Element Attribute Value Should Be    ${cell}            role        cell
    Page Should Contain Element          css:[role=cell]    limit=80
    Click Button                         ${next_page}
    Page Should Contain Element          css:[role=cell]    limit=80
    Select From List By Value            ${page_size}       5
    Page Should Contain Element          css:[role=cell]    limit=40

DOM contains aria-sort ascending or descending when a column is order by
    Element Attribute Value Should Be    ${column7_header}    aria-sort    ${None}
    Click Element                        ${column7_header}
    Element Attribute Value Should Be    ${column7_header}    aria-sort    ascending
    Click Element                        ${column7_header}
    Element Attribute Value Should Be    ${column7_header}    aria-sort    descending
    Click Element                        ${column1_header}
    Element Attribute Value Should Be    ${column7_header}    aria-sort    ${None}

DOM contains aria-selected=boolean when a row is selected and unselected
    [Setup]    NONE    
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretable--tablecheckbox
    Wait Until Page Contains             This is a Title              10s
    Page Should Contain Element          css:[aria-selected=false]    limit=10
    Click Element                        ${checkbox_row_1}
    Element Attribute Value Should Be    ${row_1}                     aria-selected    true
    Click Element                        ${checkbox_row_1}
    Element Attribute Value Should Be    ${row_1}                     aria-selected    false
    Select Checkbox                      ${all_checkbox}
    Page Should Contain Element          css:[aria-selected=true]     limit=10
    
DOM contains aria-expanded=boolean when a row is expanded and shrink
    [Setup]    NONE
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretable--tableexpander
    Wait Until Page Contains             This is a Title             10s
    Page Should Not Contain Element      css:[aria-expanded=true]
    Click Element                        ${row_1}
    Element Attribute Value Should Be    ${row_1}                    aria-expanded    true
    Click Element                        ${cell_1_1}
    Element Attribute Value Should Be    ${row_1}                    aria-expanded    ${None}
          
