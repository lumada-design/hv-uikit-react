*** Setting ***
Variables         ../../../_resources/storybook_variables.yaml
Variables         ../variables.yaml
Resource          ../../../_resources/storybook_keywords.robot
Library           SeleniumLibrary


*** Comments ***
don't was possible use selenium keywords for table because this component don't has a table semantic. 


*** Keywords ***
render next table page
    ${text_cell}=                       Get Text            ${cell_1_1}
    Click Button                        ${next_page}
    Wait Until Page Does Not Contain    ${text_cell}        3s
    Textfield Value Should Be           ${input_page}       2

render previous table page
    ${text_cell}=                       Get Text            ${cell_1_1}
    Click Button                        ${next_page}
    Wait Until Page Does Not Contain    ${text_cell}        3s
    Click Button                        ${previous_page}
    Wait Until Page Contains            ${text_cell}        3s
    Textfield Value Should Be           ${input_page}       1

render last table page
    ${text_cell}=                       Get Text            ${cell_1_1}
    Click Button                        ${last_page}
    Element Should Be Disabled          ${last_page}
    Element Should Be Disabled          ${next_page}
    Wait Until Page Does Not Contain    ${text_cell}        3s

render first table page
    ${text_cell}=                       Get Text            ${cell_1_1}
    Click Button                        ${last_page}
    Wait Until Page Does Not Contain    ${text_cell}        3s
    Click Button                        ${first_page}
    Wait Until Page Contains            ${text_cell}        3s
    Element Should Be Disabled          ${first_page}
    Element Should Be Disabled          ${previous_page}
    Textfield Value Should Be           ${input_page}       1

render specific table page number
    [Documentation]    
    ...    - the selenium webdrivers can not override existent input value (even with force input keyword)
    ...    - input have value '1'+'3'=13 and pagination component will return last page that is 3 
    ${text_cell}=                       Get Text         ${cell_1_1}
    force input                         ${input_page}    2
    Click Element                       css:body
    Wait Until Page Does Not Contain    ${text_cell}     3s

render first table page when a column is sorted
    Click Button                 ${next_page}
    Click Element                ${column1_header}
    Textfield Value Should Be    ${input_page}        1

