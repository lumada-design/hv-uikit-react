*** Setting ***
Resource         _assetInventory.resource
Test Setup       open assetInventory sample    configurations
Test Template    validate search


*** Test Cases ***        filter    assertion          numItems
search for Event Title    trac      Track severe 8     5
search for Event fix      fix n     Fix now            5
search for Probability    97        Track severe 8     1

list view filter rows when search for Event Title
    [Documentation]    traceability: issue 1522
    [Template]    NONE
    Click Element      ${buttonListView}
    Select Dropdown Value               ${pageSize}     10
    scroll to element                   ${searchBox}
    Press Keys                          ${searchBox}    track 7
    Wait Until Page Contains            Track 7 severe breakdown
    Wait Until Page Contains Element    ${rows}         limit=1

hide cards and pagination when search does not return data
    [Template]    NONE
    Press Keys                           ${searchBox}      João
    Wait Until Element Is Not Visible    ${cards}
    Wait Until Element Is Not Visible    ${pageNavigator}

show all results when user delete search text
    [Template]    NONE
    Select Dropdown Value               ${pageSize}     10
    scroll to element                   ${searchBox}
    Press Keys                          ${searchBox}    97
    Wait Until Page Contains Element    ${cards}        limit=1
    Press Keys                          ${searchBox}    BACKSPACE    BACKSPACE
    Wait Until Page Contains Element    ${cards}        limit=10

remove search when user click button clear the text
    [Template]    NONE
    Select Dropdown Value               ${pageSize}     10
    scroll to element                   ${searchBox}
    Press Keys                          ${searchBox}    97
    Wait Until Page Contains Element    ${cards}        limit=1
    Click Button                        ${buttonClearText}
    Wait Until Page Contains Element    ${cards}        limit=10


*** Keywords ***
validate search
    [Documentation]    filter specific cards that contains ${filter} text
    [Arguments]        ${filter}    ${assertion}    ${numItems}
    Select Dropdown Value               ${pageSize}     10
    scroll to element                   ${searchBox}
    Press Keys                          ${searchBox}    ${filter}
    Wait Until Page Contains            ${assertion}
    Wait Until Page Contains Element    ${cards}        limit=${numItems}
