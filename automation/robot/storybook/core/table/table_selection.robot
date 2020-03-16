*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tablecheckbox    ${table}    10s
Suite Teardown    Close Browser
Force Tags        smoke    


*** Comments ***
don't was possible use selenium keywords for table because this component don't has a table semantic. 


*** Test Cases ***
select and unselect multiple rows when a line checker is clicked
    Click Element                  ${checkbox_row_1}
    Click Element                  ${checkbox_row_5}
    Click Element                  ${checkbox_row_10}
    Click Element                  ${checkbox_row_5}
    Page Should Contain Element    css:input:checked           limit=2

select all rows when All is checked and pagination have more than 1 page
    Page Should Contain Element    css:input:checked    limit=0
    Page Should not Contain        13 of 13
    Select Checkbox                ${all_checkbox}
    Page Should Contain            13 of 13
    Page Should Contain Element    css:input:checked    limit=11
    Click Element                  ${next_page}
    Page Should Contain Element    css:input:checked    limit=4
    
select all rows when All is checked and All checker is on indeterminate state
    Select Checkbox                ${checkbox_row_10}
    Page Should Contain            1 of 13
    Page Should Contain Element    css:input:checked     limit=1
    Select Checkbox                ${all_checkbox}
    Page Should Contain            13 of 13
    Page Should Contain Element    css:input:checked     limit=11
    
unselect all rows when All is unchecked and pagination have more than 1 page
    Select Checkbox                ${all_checkbox}
    Click Element                  ${next_page}
    Page Should Contain            13 of 13
    Unselect Checkbox              ${all_checkbox}
    Page Should Not Contain        13 of 13
    Page Should Contain Element    css:input:checked    limit=0
    Click Element                  ${previous_page}
    Page Should Contain            All    

keep selection when pagination is moved to next page
    Select Checkbox                    ${checkbox_row_10}
    Select From List By Value          ${page_size}          5
    Checkbox Should Not Be Selected    ${checkbox_row_5}
    Click Element                      ${next_page}
    Checkbox Should Be Selected        ${checkbox_row_5}
       
keep selection when pagination is moved to previous page
    Select Checkbox                    ${checkbox_row_1}
    Click Element                      ${next_page}
    Checkbox Should Not Be Selected    ${checkbox_row_1}     
    Click Element                      ${previous_page}
    Checkbox Should Be Selected        ${checkbox_row_1}

keep selection when number of rows per table is changed 
    Select Checkbox                ${checkbox_row_1}
    Select Checkbox                ${checkbox_row_10}
    Select From List By Value      ${page_size}          20
    Checkbox Should Be Selected    ${checkbox_row_1}
    Checkbox Should Be Selected    ${checkbox_row_10}

keep selection when column is sorted by
    Select Checkbox                ${checkbox_row_5}
    Click Element                  ${column1_header}
    Checkbox Should Be Selected    ${checkbox_row_5}


