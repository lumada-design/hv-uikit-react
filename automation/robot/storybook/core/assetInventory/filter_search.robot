*** Setting ***
Resource          _keywords.resource
Test Setup        Run Keywords
...               Go To    ${components}asset-inventory--configurations
...               AND    Wait Until Element Is Visible    hv-assetinventory
Test Template     validate search


*** Test Cases ***
filter just specific card when search for Event Title    ${cards}    5    trac      Track severe 8
filter just specific card when search for Event fix      ${cards}    5    fix n     Fix now
filter just specific card when search for Probability    ${cards}    1    97        Track severe 8

list view filter rows when search for Event Title
    [Documentation]    traceability: issue 1522
    [Template]    NONE
    Click Element    ${listViewButton}
    validate search    ${rows}    1    track 7      Track 7 severe breakdown

hide cards and pagination when search does not return data
    [Template]    NONE
    Press Keys                           ${searchBox}      João
    Wait Until Element Is Not Visible    ${cards}
    Wait Until Element Is Not Visible    ${pageNavigator}

show all results when user delete search text
    [Template]    NONE
    Select From List By Value      ${pageSize}     10
    Press Keys                     ${searchBox}    97
    Page Should Contain Element    ${cards}        limit=1
    Press Keys                     ${searchBox}    BACKSPACE    BACKSPACE
    Page Should Contain Element    ${cards}        limit=10

remove search when user click button clear the text
    [Template]    NONE
    Select From List By Value      ${pageSize}     10
    Press Keys                     ${searchBox}    97
    Page Should Contain Element    ${cards}        limit=1
    Click Button                   ${clearText}
    Page Should Contain Element    ${cards}        limit=10

*** Keywords ***
validate search
    [Arguments]    ${items}    ${numItems}    ${search}    ${Assertion}
    Select From List By Value      ${pageSize}     10
    Press Keys                     ${searchBox}    ${search}
    Wait Until Page Contains       ${Assertion}
    Page Should Contain Element    ${items}        limit=${numItems}
