*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Variables ***
${cardsSelector}      css:div[id*='Card_id'][class*='MuiCard-root']
${firstCardHeader}    xpath:(//span[contains(@class,'title')])[1]
${dropdownHeader}     sort_hv-assetinventory-header
${sortTitleDesc}      sort_hv-assetinventory-values-list-item-1
${nextPage}           hv-assetinventory-nextPage-button
${prevPage}           hv-assetinventory-previousPage-button
${pageSizeChange}     css:select[id|='hv-assetinventory-pageSize']
${firstCheckbox}      css:input[value='id_0']
${searchBox}          css:input[type='text']
${cardView}           cardView


*** Test Cases ***
Filtering from 4 to 1 card
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory    10s
    Page Should Contain Element      ${cardsSelector}     limit=4
    Input Text                       ${searchBox}         1 trac
    Wait Until Element Is Visible    ${cardView}          2s
    Page Should Contain Element      ${cardsSelector}     limit=1

Sort by title
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory     10s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Element Text Should Be           ${firstCardHeader}    0 Risk of downtime 1
    Click Element                    ${dropdownHeader}
    Wait Until Element Is Visible    ${sortTitleDesc}      2s
    Click Element                    ${sortTitleDesc}
    Wait Until Element Is Visible    ${firstCardHeader}    2s
    Element Text Should Be           ${firstCardHeader}    9 Track severe 10

Filter and then sort
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory     10s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Input Text                       ${searchBox}          2
    Wait Until Element Is Visible    ${cardView}           2s
    Page Should Contain Element      ${cardsSelector}      limit=2
    Element Text Should Be           ${firstCardHeader}    1 Track severe 2
    Click Element                    ${dropdownHeader}
    Wait Until Element Is Visible    ${sortTitleDesc}      2s
    Click Element                    ${sortTitleDesc}
    Wait Until Element Is Visible    ${firstCardHeader}    2s
    Element Text Should Be           ${firstCardHeader}    2 Risk of downtime 3

Change from cardView to listView
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory                  10s
    Element Should not Be Visible    css:table[id=listView]>tbody>tr
    Page Should Contain Element      ${cardsSelector}                   limit=4
    Click Button                     listView
    Wait Until Element Is Visible    css:table[id=listView]             5s
    Page Should Contain Element      css:table[id=listView]>tbody>tr    limit=4

Using pagination to navigate through 3 pages
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory     10s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Element Text Should Be           ${firstCardHeader}    0 Risk of downtime 1
    Click Button                     ${nextPage}
    Wait Until Element Is Visible    ${cardView}           2s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Element Text Should Be           ${firstCardHeader}    4 Risk of downtime 5
    Click Button                     ${nextPage}
    Page Should Contain Element      ${cardsSelector}      limit=2
    Element Text Should Be           ${firstCardHeader}    8 Risk of downtime 9
    Click Button                     ${prevPage}
    Wait Until Element Is Visible    ${cardView}           2s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Element Text Should Be           ${firstCardHeader}    4 Risk of downtime 5

Using navigation with filtered results
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory     10s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Input Text                       ${searchBox}          track
    Wait Until Element Is Visible    ${cardView}           2s
    Element Text Should Be           ${firstCardHeader}    1 Track severe 2
    Click Button                     ${nextPage}
    Wait Until Element Is Visible    ${cardView}           2s
    Page Should Contain Element      ${cardsSelector}      limit=1
    Element Text Should Be           ${firstCardHeader}    9 Track severe 10
    Click Button                     ${prevPage}
    Wait Until Element Is Visible    ${cardView}           2s
    Page Should Contain Element      ${cardsSelector}      limit=4
    Element Text Should Be           ${firstCardHeader}    1 Track severe 2

Sort when in page two
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory     10s
    Click Button                     ${nextPage}
    Wait Until Element Is Visible    ${dropdownHeader}     2s
    Click Element                    ${dropdownHeader}
    Wait Until Element Is Visible    ${sortTitleDesc}      2s
    Click Element                    ${sortTitleDesc}
    Wait Until Element Is Visible    ${firstCardHeader}    2s
    Element Text Should Be           ${firstCardHeader}    5 Track severe 6
    Click Button                     ${prevPage}
    Wait Until Element Is Visible    ${firstCardHeader}    2s
    Element Text Should Be           ${firstCardHeader}    9 Track severe 10

Change page size from 4 to 6
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible    hv-assetinventory                      10s
    Page Should Contain Element      ${cardsSelector}                       limit=4
    Click Element                    ${pageSizeChange}>option[value='6']
    Wait Until Element Is Visible    ${cardView}                            2s
    Page Should Contain Element      ${cardsSelector}                       limit=6
    Element Text Should Be           hv-assetinventory-totalPages           2

Change page size when in page two
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible        hv-assetinventory                      10s
    Click Button                         ${nextPage}
    Wait Until Element Is Visible        ${cardView}                            2s
    Page Should Contain Element          ${cardsSelector}                       limit=4
    Click Element                        ${pageSizeChange}>option[value='6']
    Wait Until Element Is Visible        ${cardView}                            2s
    Page Should Contain Element          ${cardsSelector}                       limit=4
    Element Attribute Value Should Be    hv-assetinventory-currentPage-input    value      2
    Element Text Should Be               hv-assetinventory-totalPages           2

Change page size when in page two changing to page one
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible        hv-assetinventory                       10s
    Click Button                         ${nextPage}
    Wait Until Element Is Visible        ${cardView}                             2s
    Page Should Contain Element          ${cardsSelector}                        limit=4
    Click Element                        ${pageSizeChange}>option[value='10']
    Wait Until Element Is Visible        ${cardView}                             2s
    Page Should Contain Element          ${cardsSelector}                        limit=10
    Element Attribute Value Should Be    hv-assetinventory-currentPage-input     value       1
    Element Text Should Be               hv-assetinventory-totalPages            1

Maintain selection between search's
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible      hv-assetinventory                     10s
    Checkbox Should Not Be Selected    ${firstCheckbox}
    Select Checkbox                    ${firstCheckbox}
    Input Text                         ${searchBox}                          trac
    Wait Until Element Is Visible      ${cardView}                           2s
    Click Button                       css:button[title='Clear the text']
    Wait Until Element Is Visible      ${cardView}                           2s
    Checkbox Should Be Selected        ${firstCheckbox}

Maintain selection between pages
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coreassetinventory--simple
    Wait Until Element Is Visible      hv-assetinventory    10s
    Checkbox Should Not Be Selected    ${firstCheckbox}
    Select Checkbox                    ${firstCheckbox}
    Click Button                       ${nextPage}
    Wait Until Element Is Visible      ${prevPage}          2s
    Click Button                       ${prevPage}
    Wait Until Element Is Visible      ${cardView}          2s
    Checkbox Should Be Selected        ${firstCheckbox}
