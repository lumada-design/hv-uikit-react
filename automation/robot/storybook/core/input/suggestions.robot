*** Setting ***
Resource      _input.resource
Test Setup    open input sample    ${inputs}    suggestion


*** Test Cases ***
update suggestions when input is being changed
    Wait Until Element Is Visible    ${input}
    Press Keys                          ${input}    p
    Wait Until Page Contains            Pakistan
    Press Keys                          NONE    o
    Wait Until Page Does Not Contain    Pakistan
    Page Should Contain                 Portugal
    Page Should Contain Element         ${suggestion_options}    limit=2

close suggestions list when a suggestion item is selected
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Click Element                        ${suggestion_Portugal}
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal

select correctly suggestion when suggestion text area is pressed
    [Tags]     bug-ie-webdriver
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Click Element                        xpath://li[.='Portugal']
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal


close suggestions list when did not have related suggestions to display
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    Jo
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE   ao
    Wait Until Element Is Not Visible    ${suggestion_list}

close suggestions list when is clicked away
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Click Element                        ${label}
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    po

close suggestions list when input is cleaned
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    p
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    BACKSPACE
    Wait Until Element Is Not Visible    ${suggestion_list}


*** Variables ***
${input}                 css:input[type=text]
${label}                 css:#suggestions-label
${suggestion_list}       css:ul[role=listbox]
${suggestion_options}    css:ul[role=listbox]>li
${suggestion_Portugal}   xpath://li[.='Portugal']
