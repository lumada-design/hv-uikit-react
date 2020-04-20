*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        Go To URL And Wait Until Element Is Visible    ${STORYBOOK_URL}/iframe.html?id=components-pagination--controlled-sample    ${input}    10s
Suite Teardown    Close Browser
Force Tags        smoke    bug-infrastructure-ie

*** Variables ***
${input}        css:input
${select}       css:select
${first}        pagination-firstPage-button
${previous}     pagination-previousPage-button
${next}         pagination-nextPage-button
${last}         pagination-lastPage-button

*** Test Cases ***
check default disabled previous/first page
    Element Should Be Disabled          ${first}
    Element Should Be Disabled          ${previous}
    Textfield Value Should Be           ${input}        1

navigate to the next page
    Click Button                        ${next}
    Textfield Value Should Be           ${input}        2

navigate to the last page
    Click Button                        ${last}
    Element Should Be Disabled          ${last}
    Textfield Value Should Be           ${input}        6

navigate to the last and then first
    Click Button                        ${last}
    Textfield Value Should Be           ${input}        6
    Click Button                        ${first}
    Textfield Value Should Be           ${input}        1

navigate to the 4th page
    Element Should Be Enabled           ${next}
    Click Button                        ${next}
    Click Button                        ${next}
    Click Button                        ${next}
    Textfield Value Should Be           ${input}        4

input value greater than maximum pages
    Input Text                          ${input}        8
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        6

input value less than minimal pages
    Input Text                          ${input}        -3
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        3

input value just accept integers
    Input Text                          ${input}        invalid
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        1

input last page then change page size
    Input Text                          ${input}        6
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        6
    Click Element                       //select/option[5]
    Textfield Value Should Be           ${input}        2

change page size on last page
    Click Element                       //select/option[1]
    Click Button                        ${last}
    Textfield Value Should Be           ${input}        16
    Click Element                       //select/option[4]
    Textfield Value Should Be           ${input}        3

change page size does not change page
    Click Element                       //select/option[1]
    Textfield Value Should Be           ${input}        1
    Click Element                       //select/option[2]
    Textfield Value Should Be           ${input}        1
    Click Element                       //select/option[3]
    Textfield Value Should Be           ${input}        1
    Click Element                       //select/option[4]
    Textfield Value Should Be           ${input}        1
    Click Element                       //select/option[5]
    Textfield Value Should Be           ${input}        1

navigation does not change page size
    Get Element Attribute               ${select}       value=12
    Click Button                        ${next}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${next}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${previous}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${last}
    Get Element Attribute               ${select}       value=12
