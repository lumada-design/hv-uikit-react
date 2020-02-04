*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
check default disabled previous/first page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${input}        10s
    Element Should Be Disabled          ${first}
    Element Should Be Disabled          ${previous}
    Textfield Value Should Be           ${input}        1

navigate to the next page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${next}        10s
    Click Button                        ${next}
    Textfield Value Should Be           ${input}        2

navigate to the last page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${last}        10s
    Click Button                        ${last}
    Element Should Be Disabled          ${last}
    Textfield Value Should Be           ${input}        6

navigate to the last and then first
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${last}         10s
    Click Button                        ${last}
    Textfield Value Should Be           ${input}        6
    Click Button                        ${first}
    Textfield Value Should Be           ${input}        1

navigate to the 4th page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${next}         10s
    Element Should Be Enabled           ${next}
    Click Button                        ${next}
    Click Button                        ${next}
    Click Button                        ${next}
    Textfield Value Should Be           ${input}        4

input value greater than maximum pages
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${input}        10s
    Input Text                          ${input}        8
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        6

input value less than minimal pages
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${input}        10s
    Input Text                          ${input}        -3
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        3

input value just accept integers
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${input}        10s
    Input Text                          ${input}        invalid
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        1

input last page then change page size
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${input}        10s
    Input Text                          ${input}        6
    Press Keys                          ${input}        RETURN
    Textfield Value Should Be           ${input}        6
    Click Element                       //select/option[5]
    Textfield Value Should Be           ${input}        2

change page size on last page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${select}       10s
    Click Element                       //select/option[1]
    Click Button                        ${last}
    Textfield Value Should Be           ${input}        16
    Click Element                       //select/option[4]
    Textfield Value Should Be           ${input}        3

change page size does not change page
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${select}       10s
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
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corepagination--pagination2
    Wait Until Element Is Enabled       ${select}       10s
    Get Element Attribute               ${select}       value=12
    Click Button                        ${next}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${next}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${previous}
    Get Element Attribute               ${select}       value=12
    Click Button                        ${last}
    Get Element Attribute               ${select}       value=12
