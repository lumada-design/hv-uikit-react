*** Setting ***
Resource      _suggestions.resource
Test Setup    open suggestion sample    main


*** Test Cases ***
update suggestions when input is being changed
    Press Keys                          ${input}    p
    Wait Until Page Contains            Pakistan
    Press Keys                          NONE    o
    Wait Until Page Does Not Contain    Pakistan
    Page Should Contain                 Portugal
    Page Should Contain Element         ${suggestion_options}    limit=2

update suggestions by server side when input is being changed
    [Setup]     open suggestion sample    server-side-suggestions
    Press Keys                          ${input}    tu
    Wait Until Page Contains            Tunisia
    Press Keys                          NONE    g
    Wait Until Page Does Not Contain    Tunisia
    Wait Until Page Contains            Portugal
    Page Should Contain Element         ${suggestion_options}    limit=1

close suggestions list when a suggestion item is selected
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Click Element                        ${suggestion_Portugal}
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal

close suggestions list when did not have related suggestions to display
    Press Keys                           ${input}    Jo
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE   ao
    Wait Until Element Is Not Visible    ${suggestion_list}

close suggestions list when is clicked away
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Click Element                        ${label}
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    po

close suggestions list when input is cleaned
    Press Keys                           ${input}    p
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    BACKSPACE
    Wait Until Element Is Not Visible    ${suggestion_list}
