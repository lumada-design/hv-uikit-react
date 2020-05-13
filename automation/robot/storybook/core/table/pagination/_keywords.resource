*** Setting ***
Library     SeleniumLibrary
Resource    ../table.resource


*** Keywords ***
click next page
    Textfield Value Should Be        ${pagination_input}    1
    Click Button                     ${pagination_next_page}
    Wait Until Element Is Enabled    ${pagination_first_page}    3s
    Textfield Value Should Be        ${pagination_input}    2

click previous page
    Click Button                     ${pagination_next_page}
    Wait Until Element Is Enabled    ${pagination_previous_page}    3s
    Click Button                     ${pagination_previous_page}
    Wait Until Element Is Enabled    ${pagination_input}    3s
    Textfield Value Should Be        ${pagination_input}    1

click last page
    Textfield Value Should Be        ${pagination_input}    1
    Click Button                     ${pagination_last_page}
    Wait Until Element Is Enabled    ${pagination_first_page}    3s
    Element Should Be Disabled       ${pagination_last_page}
    Element Should Be Disabled       ${pagination_next_page}

click first page
    Click Button                     ${pagination_last_page}
    Wait Until Element Is Enabled    ${pagination_first_page}    3s
    Click Button                     ${pagination_first_page}
    Wait Until Element Is Enabled    ${pagination_input}    3s
    Textfield Value Should Be        ${pagination_input}    1
    Element Should Be Disabled       ${pagination_first_page}
    Element Should Be Disabled       ${pagination_previous_page}

input a page number
    [Documentation]
    Double Click Element         ${pagination_input}
    Press Keys                   NONE    2    ENTER
    Textfield Value Should Be    ${pagination_input}    2
