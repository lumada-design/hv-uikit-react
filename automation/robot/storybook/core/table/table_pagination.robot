*** Setting ***
Resource      _table.resource
Test Setup    open table sample    ${display}    kitchen-sink


*** Test Cases ***

paginate to next page
    Wait Until Element Is Enabled    ${nav_next_page}
    Textfield Value Should Be        ${nav_input}    1
    Click Button                     ${nav_next_page}
    Wait Until Element Is Enabled    ${nav_first_page}
    Textfield Value Should Be        ${nav_input}    2

paginate to previous page
    Wait Until Element Is Enabled    ${nav_next_page}
    Click Button                     ${nav_next_page}
    Wait Until Element Is Enabled    ${nav_previous_page}
    Wait Until Keyword Succeeds      2x    0.5s     #note1
    ...    Click Button              ${nav_previous_page}
    Wait Until Element Is Enabled    ${nav_input}
    Textfield Value Should Be        ${nav_input}    1

paginate to last page
    Wait Until Element Is Enabled    ${nav_last_page}
    Textfield Value Should Be        ${nav_input}    1
    Click Button                     ${nav_last_page}
    Wait Until Element Is Enabled    ${nav_first_page}
    Element Should Be Disabled       ${nav_last_page}
    Element Should Be Disabled       ${nav_next_page}

paginate to first page
    Wait Until Element Is Enabled    ${nav_last_page}
    Click Button                     ${nav_last_page}
    Wait Until Element Is Enabled    ${nav_first_page}
    Wait Until Keyword Succeeds      2x    0.5s     #note1
    ...    Click Button              ${nav_first_page}
    Wait Until Element Is Enabled    ${nav_input}
    Textfield Value Should Be        ${nav_input}    1
    Element Should Be Disabled       ${nav_first_page}
    Element Should Be Disabled       ${nav_previous_page}

input a page number
    [Documentation]
    Wait Until Element Is Enabled    ${nav_input}
    Double Click Element             ${nav_input}
    Press Keys                       NONE    2    ENTER
    Wait Until Element Is Enabled    ${nav_input}
    Textfield Value Should Be        ${nav_input}    2