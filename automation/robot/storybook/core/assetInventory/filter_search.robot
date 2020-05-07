*** Setting ***
Library           SeleniumLibrary
Resource          _keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        Run Keywords
...               Go To    ${iframeConfigurations}
...               AND      Wait Until Element Is Visible    hv-assetinventory    10s
Test Template     validate search
Force Tags        smoke


*** Test Cases ***
filter just specific card when search for Event Title    ${cards}    1    7 trac    7 Track severe 8
filter just specific card when search for Event fix      ${cards}    5    fix n     Fix now
filter just specific card when search for Probability    ${cards}    1    97        7 Track severe 8

list view filter rows when search for Event Title
    [Documentation]    traceability: issue 1522 
    [Template]    NONE
    Click Element    ${listViewButton}
    validate search    ${rows}    1    7 trac    Track 7 severe breakdown
    
hide cards and pagination when search does not return data
    [Template]    NONE
    Press Keys                           ${searchBox}      João
    Wait Until Element Is Not Visible    ${cards}    4s
    Wait Until Element Is Not Visible    ${pageNavigator}    4s

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
    Wait Until Page Contains       ${Assertion}    5s
    Page Should Contain Element    ${items}        limit=${numItems}
