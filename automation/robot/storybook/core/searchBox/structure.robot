*** Setting ***
Resource      _searchBox.resource
Test Setup    open searchBox sample     dynamic-search

*** Test Cases ***
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
    Wait Until Page Contains Element    ${searchBox} li    limit=2

close suggestions list when clear button is clicked
    [Documentation]
    ...   use case: Content can be cleaned by mouse clicking the clear button
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains Element    ${searchBox} li    limit=6
    wait Until Element Is Enabled       ${clearButton}
    Click Element                       ${clearButton}
    Wait Until Page Contains Element    ${searchBox} li    limit=0

close suggestions list when a suggestion item is selected
    Press Keys                           ${searchBox} input    po
    Wait Until Page Contains              Portugal
    Click Element                        ${searchBox} li:last-child
    Wait Until Element Is Not Visible    ${searchBox} li
    Textfield Value Should Be            ${searchBox} input    Portugal

close suggestions list when did not have related suggestions to display
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains Element    ${searchBox} li    limit=6
    Press Keys                          NONE    Joao
    Wait Until Page Contains Element    ${searchBox} li    limit=0

close suggestions list when is clicked away
    [Documentation]
    ...   use case:
    ...   Callback onBlur is triggered when the content is unfocused
    Press Keys                          ${searchBox} input    p
    Wait Until Page Contains Element    ${searchBox} li    limit=6
    click Element                       css:body
    Wait Until Page Contains Element    ${searchBox} li    limit=0
    Textfield Value Should Be           ${searchBox} input    p
