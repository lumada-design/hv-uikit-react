*** Setting ***
Resource    ../table.resource


*** Keywords ***
click next page
    Textfield Value Should Be        ${pagination_input}    1
    Click Button                     ${pagination_next_page}
    Wait Until Element Is Enabled    ${pagination_first_page}
    Textfield Value Should Be        ${pagination_input}    2

click previous page
    Click Button                     ${pagination_next_page}
    Wait Until Element Is Enabled    ${pagination_previous_page}
    Wait Until Keyword Succeeds      2x    0.5s     #note1
    ...    Click Button              ${pagination_previous_page}
    Wait Until Element Is Enabled    ${pagination_input}
    Textfield Value Should Be        ${pagination_input}    1

click last page
    Textfield Value Should Be        ${pagination_input}    1
    Click Button                     ${pagination_last_page}
    Wait Until Element Is Enabled    ${pagination_first_page}
    Element Should Be Disabled       ${pagination_last_page}
    Element Should Be Disabled       ${pagination_next_page}

click first page
    Click Button                     ${pagination_last_page}
    Wait Until Element Is Enabled    ${pagination_first_page}
    Wait Until Keyword Succeeds      2x    0.5s     #note1
    ...    Click Button              ${pagination_first_page}
    Wait Until Element Is Enabled    ${pagination_input}
    Textfield Value Should Be        ${pagination_input}    1
    Element Should Be Disabled       ${pagination_first_page}
    Element Should Be Disabled       ${pagination_previous_page}

input a page number
    [Documentation]
    Double Click Element         ${pagination_input}
    Press Keys                   NONE    2    ENTER
    Textfield Value Should Be    ${pagination_input}    2


*** Comments ***
note1:
    randomly was verified at firefox "StaleElementReferenceException is stale;
    either the element is no longer attached to the DOM, it is not in the current frame context,
     or the document has been refreshed"
