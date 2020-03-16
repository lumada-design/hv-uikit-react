*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/iframe.html?id=coretable--tablesimple    ${input_page}    10s
Test Teardown     Run Keyword If Test Failed                     Capture Page Screenshot    ${SUITE_NAME}.png
Suite Teardown    Close Browser
Force Tags        smoke


*** Comments ***
don't was possible use selenium keywords for table because this component don't has a table semantic. 


*** Test Cases ***
navigate to the next page when next button is clicked
    elements text should be      ${title_cells}    Title,Event 12,Event 11,Event 10,Event 9,Event 8,Event 7,Event 6,Event 5,Event 4,Event 3
    Click Button                 ${next_page}
    Textfield Value Should Be    ${input_page}     2
    elements text should be      ${title_cells}    Title,Event 2,Event 1,Event 1

navigate to the previous page when previous button is clicked
    Click Button                 ${next_page}
    Textfield Value Should Be    ${input_page}       2
    Click Button                 ${previous_page}
    Textfield Value Should Be    ${input_page}       1
    Page Should Not Contain      Event 2

navigate to the last page when last button is clicked
    Select From List By Value    ${page_size}      5
    Textfield Value Should Be    ${input_page}     1
    Click Button                 ${last_page}
    Textfield Value Should Be    ${input_page}     3
    elements text should be      ${title_cells}    Title,Event 2,Event 1,Event 1

navigate to the first page when first button is clicked
    Select From List By Value    ${page_size}      5
    Click Button                 ${last_page}
    Textfield Value Should Be    ${input_page}     3
    Click Button                 ${first_page}
    Textfield Value Should Be    ${input_page}     1
    elements text should be      ${title_cells}    Title,Event 12,Event 11,Event 10,Event 9,Event 8

navigate to specific page number when that number is inserted on pagination input
    [Documentation]    
    ...    - the selenium webdrivers can not override existent input value (even with force input keyword)
    ...    - input have value '1'+'3'=13 and pagination component will return last page that is 3 
    Select From List By Value    ${page_size}      5
    Textfield Value Should Be    ${input_page}     1
    force input                  ${input_page}     3
    Click Element                css:body
    elements text should be      ${title_cells}    Title,Event 2,Event 1,Event 1

restore pagination to page 1 when a column is sorted and pagination is greater than 1
    Select From List By Value    ${page_size}       5
    Click Button                 ${next_page}
    Click Element                ${column1_header}
    elements text should be      ${title_cells}     Title,Event 1,Event 1,Event 2,Event 3,Event 4

show all data in single page when is increased the number of rows per page and pagination is on last page
    Click Button                 ${last_page}
    Select From List By Value    ${page_size}      20
    elements text should be      ${title_cells}    Title,Event 12,Event 11,Event 10,Event 9,Event 8,Event 7,Event 6,Event 5,Event 4,Event 3,Event 2,Event 1,Event 1

show table with multiples pages when decreased the number of rows per page and pagination is on last page
    Click Button                 ${last_page}
    Select From List By Value    ${page_size}      5
    Textfield Value Should Be    ${input_page}     3
    elements text should be      ${title_cells}    Title,Event 2,Event 1,Event 1
