*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        go to url and wait until element is visible
...               ${STORYBOOK_URL}/iframe.html?id=coretable--tablecheckbox    ${table}             10s
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot       ${SUITE_NAME}.png
Force Tags        keyboard    bug-infrastructure-ie
Documentation     https://www.w3.org/TR/wai-aria-practices/#table


*** Test Cases ***
header tab: change focus to next sortable column header when pressed TAB on column header
    [Tags]    bug-infrastructure-ie
    set focus and press keys             ${column1_header}                  TAB
    Element Should Be Focused            ${column2_header} [role=button]
    Element Attribute Value Should Be    ${column2_header} [role=button]    tabindex    0
    Press Keys                           None                               TAB         TAB    TAB    TAB    TAB    TAB
    Element Should Be Focused            ${column8_header} [role=button]
    Element Attribute Value Should Be    ${column8_header} [role=button]    tabindex    0

header enter: sort the column ascending and descending when is pressed ENTER focused column header
    set focus and press keys             ${column1_header}                  TAB
    Element Should Be Focused            ${column2_header} [role=button]
    Press Keys                           None                               ENTER
    Element Attribute Value Should Be    ${column2_header}                  aria-sort    ascending
    Press Keys                           None                               ENTER
    Element Attribute Value Should Be    ${column2_header}                  aria-sort    descending

header space: sort the column ascending and descending when is pressed SPACE focused column header  
    set focus and press keys             ${column1_header}                  TAB
    Element Should Be Focused            ${column2_header} [role=button]
    Press Keys                           None                               SPACE
    Element Attribute Value Should Be    ${column2_header}                  aria-sort    ascending
    Press Keys                           None                               SPACE
    Element Attribute Value Should Be    ${column2_header}                  aria-sort    descending

header shift+tab: change focus to previous sortable column header when pressed SHIFT+TAB on column header
    set focus and press keys             ${column8_header}                  SHIFT+TAB
    Element Should Be Focused            ${column7_header} [role=button]
    Element Attribute Value Should Be    ${column7_header} [role=button]    tabindex    0    

header tab: jump focus to row selection when pressed TAB on last sortable column header
    [Documentation]    the column 9 should not receive focus 
    set focus and press keys     ${column8_header}                  TAB
    Element Should Be Focused    ${column8_header} [role=button]
    Press Keys                   None                               TAB
    Element Should Be Focused    ${checkbox_row_1}

table tab: change focus to rows selection when pressed TAB on last iterable column header
    set focus and press keys     xpath:(//a)[last()]    TAB
    Element Should Be Focused    ${page_size}
    
table tab: change focus to pagination when pressed TAB on rows selection
    set focus and press keys     ${page_size}     TAB
    Element Should Be Focused    ${input_page}

checkbox row space: select and unselect a checkbox when pressed space on table checkbox row
    Checkbox Should Not Be Selected    ${checkbox_row_10}
    set focus and press keys           ${checkbox_row_10}    SPACE
    Checkbox Should Be Selected        ${checkbox_row_10}
    Press Keys                         None                  SPACE
    Checkbox Should Not Be Selected    ${checkbox_row_10}

dropdown up arrow: show less rows when focus is on rows per page dropdown and is pressed UP ARROW
    set focus and press keys     ${page_size}     TAB

pagination space: change the page index when SPACE is pressed on pagination button
    Textfield Value Should Be    ${input_page}    1
    set focus and press keys     ${next_page}     SPACE
    Textfield Value Should Be    ${input_page}    2