*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${components}navigation-pagination--main
...           AND    Wait Until Element Is Visible    ${input}


*** Test Cases ***
check default disabled previous/first page
    Element Should Be Disabled    ${first}
    Element Should Be Disabled    ${previous}
    Textfield Value Should Be     ${input}     1

navigate to the next page
    Click Button                 ${next}
    Textfield Value Should Be    ${input}     2

navigate to the last page
    Click Button                  ${last}
    Element Should Be Disabled    ${last}
    Textfield Value Should Be     ${input}     6

navigate to the last and then first
    Click Button                 ${last}
    Textfield Value Should Be    ${input}    6
    Click Button                 ${first}
    Textfield Value Should Be    ${input}    1

navigate to the 4th page
    Element Should Be Enabled    ${next}
    Click Button                 ${next}
    Click Button                 ${next}
    Click Button                 ${next}
    Textfield Value Should Be    ${input}    4

input value greater than maximum pages
    Input Text                   ${input}    8
    Press Keys                   ${input}    RETURN
    Textfield Value Should Be    ${input}    6

input value less than minimal pages
    Input Text                   ${input}     -3
    Press Keys                   ${input}     RETURN
    Textfield Value Should Be    ${input}     1

input value just accept integers
    Input Text                   ${input}     invalid
    Press Keys                   ${input}     RETURN
    Textfield Value Should Be    ${input}     1


*** Variables ***
${input}        css:input
${select}       css:select
${first}        pagination-firstPage-button
${previous}     pagination-previousPage-button
${next}         pagination-nextPage-button
${last}         pagination-lastPage-button
