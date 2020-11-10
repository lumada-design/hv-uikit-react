*** Setting ***
Resource      _searchBox.resource
Test Setup    open searchBox sample    dynamic-search
Force Tags    bug-infrastructure-ie


*** Test Cases ***
basic search click search button
    [Documentation]   show search results when search button is clicked
    [Setup]    open searchBox sample     basic-search
    Page Should Not Contain     Results
    Click Element               ${searchButton}
    Wait Until Page Contains    Results

search as you type
    [Setup]    open searchBox sample    search-as-you-type
    Page Should Contain Element         ${resultItems}    limit=41
    Press Keys                          ${searchBox}    P
    Wait Until Page Contains Element    ${resultItems}    limit=5
    Press Keys                          NONE    or
    Wait Until Page Contains Element    ${resultItems}    limit=1
    Page Should Contain                 Portugal

clear button on search as you type
    [Documentation]    clear button appears when input has a value
    [Setup]    open searchBox sample    search-as-you-type
    Element Should Not Be Visible    ${clearButton}
    Press Keys                       ${searchBox}    P
    Element Should Be Visible        ${clearButton}
    Click Element                    css:body
    Element Should Be Visible        ${clearButton}

clear button
    [Documentation]    clear button just appears when focus is out of input
    Element Should Not Be Visible    ${clearButton}
    Press Keys                       ${searchBox}    P
    Element Should Not Be Visible    ${clearButton}
    Click Element                    css:body
    Element Should Be Visible        ${clearButton}

suggestions and search results
    [Documentation]   select a suggestion as a base for search results
    Press Keys                          ${searchBox} input    po
    Wait Until Page Contains            Portugal
    Click Element                       ${suggestion}:last-child
    Wait Until Page Contains Element    ${resultItems}    limit=3
    Page Should Contain                 Portugal: Population

update suggestions when input is being changed
    [Documentation]
    ...   use cases:
    ...   Can have the Suggestions to show potential matches for the typed value
    ...   Callback onChange is triggered when the content changes
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains            Pakistan
    Press Keys                          NONE    o
    Wait Until Page Does Not Contain    Pakistan
    Page Should Contain                 Portugal
    Wait Until Page Contains Element    ${suggestion}    limit=2

close suggestions list when a suggestion item is selected
    Press Keys                           ${searchBox} input    po
    Wait Until Page Contains              Portugal
    Click Element                        ${suggestion}:last-child
    Wait Until Element Is Not Visible    ${suggestion}
    Textfield Value Should Be            ${searchBox} input    Portugal

close suggestions list when did not have related suggestions to display
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains Element    ${suggestion}    limit=6
    Press Keys                          NONE    Joao
    Wait Until Page Contains Element    ${suggestion}    limit=0

close suggestions list when is clicked away
    [Documentation]
    ...   use case:
    ...   Callback onBlur is triggered when the content is unfocused
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains Element    ${suggestion}    limit=6
    click Element                       css:body
    Wait Until Page Contains Element    ${suggestion}    limit=0
    Textfield Value Should Be           ${searchBox} input    p
