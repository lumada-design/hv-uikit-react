*** Setting ***
Variables    ../../_resources/storybook_variables.yaml
Variables    variables.yaml
Resource     ../../_resources/storybook_keywords.robot
Library      SeleniumLibrary


*** Comments ***
It wasn't possible to use selenium table keywords because this component doesn't have html table semantic.


*** Keywords ***
Textfield Value Should Not Be 
    [Arguments]    ${locator}    ${value}    
    ${pageValue}           Get Element Attribute    ${locator}    value
    Should Not Be Equal    ${pageValue}             ${value}      ignore_case=True

render next table page
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s
    Textfield Value Should Be        ${input_page}    1
    Click Button                     ${next_page}
    Textfield Value Should Be        ${input_page}    2

render previous table page
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s    
    Click Button                 ${next_page}
    Textfield Value Should Be    ${input_page}       2
    Click Button                 ${previous_page}
    Textfield Value Should Be    ${input_page}       1

render last table page
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s    
    Textfield Value Should Be        ${input_page}       1
    Click Button                     ${last_page}
    Element Should Be Disabled       ${last_page}
    Element Should Be Disabled       ${next_page}
    Textfield Value Should Not Be    ${input_page}       1

render first table page
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s    
    Click Button                     ${last_page}
    Textfield Value Should Not Be    ${input_page}       1
    Click Button                     ${first_page}
    Element Should Be Disabled       ${first_page}
    Element Should Be Disabled       ${previous_page}
    Textfield Value Should Be        ${input_page}       1

render specific table page number
    [Documentation]    
    ...    - the selenium webdrivers can not override existent input value (even with force input keyword)
    ...    - input have value '1'+'3'=13 and pagination component will return last page that is 3 
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s
    force input                      ${input_page}    2
    Click Element                    css:body
    Textfield Value Should Not Be    ${input_page}    1

render first table page when a column is sorted
    [Arguments]    ${url}
    Go To                            ${url}
    Wait Until Element Is Visible    ${input_page}    10s    
    Click Button                 ${next_page}
    Click Element                ${column1_header}
    Textfield Value Should Be    ${input_page}        1

