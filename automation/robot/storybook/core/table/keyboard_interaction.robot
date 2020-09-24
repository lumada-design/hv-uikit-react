*** Setting ***
Resource          table.resource
Test Setup        Run Keywords
...               Go To    ${visualizations}table--with-checkbox
...               AND    Wait Until Element Is Visible    ${table}
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot    ${SUITE_NAME}${TEST_NAME}.png
Force Tags        keyboard    bug-infrastructure-ie    v3
Documentation     https://www.w3.org/TR/wai-aria-practices/#table
...               mouse vs keyboard problem
...               https://github.com/lumada-design/hv-uikit-react/issues/1631

*** Variables ***
${header_2_button}    ${header_2} [role=button]
${header_8_button}    ${header_8} [role=button]
${header_7_button}    ${header_7} [role=button]


*** Test Cases ***
change focus to next sortable column header when pressed TAB on column header
    set focus and press keys             ${header_2}     TAB
    Element Should Be Focused            ${header_2_button}
    Element Attribute Value Should Be    ${header_2_button}    tabindex    0
    Press Keys                           None    TAB    TAB    TAB    TAB    TAB    TAB
    Element Should Be Focused            ${header_8_button}
    Element Attribute Value Should Be    ${header_8_button}    tabindex    0

sort the column ascending and descending when is pressed ENTER focused column header
    set focus and press keys             ${header_2}     TAB
    Element Should Be Focused            ${header_2_button}
    Press Keys                           None    ENTER
    Element Attribute Value Should Be    ${header_2}    aria-sort    ascending
    Press Keys                           None    ENTER
    Element Attribute Value Should Be    ${header_2}    aria-sort    descending

sort the column ascending and descending when is pressed SPACE focused column header
    set focus and press keys             ${header_2}    TAB
    Element Should Be Focused            ${header_2_button}
    Press Keys                           None     SPACE
    Element Attribute Value Should Be    ${header_2}    aria-sort    ascending
    Press Keys                           None    SPACE
    Element Attribute Value Should Be    ${header_2}    aria-sort    descending

change focus to previous sortable column header when pressed SHIFT+TAB on column header
    set focus and press keys             ${header_8}    SHIFT+TAB
    Element Should Be Focused            ${header_7_button}
    Element Attribute Value Should Be    ${header_7_button}    tabindex    0

jump focus to row selection when pressed TAB on last sortable column header
    [Documentation]    the column 9 should not receive focus
    set focus and press keys     ${header_8}    TAB
    Element Should Be Focused    ${header_8_button}
    Press Keys                   None    TAB
    Element Should Be Focused    ${row_1_checkbox}

change focus to rows selection when pressed TAB on last iterable column header
    set focus and press keys     ${header_8_button}    TAB
    Element Should Be Focused    ${row_1_checkbox}

change focus to pagination when pressed TAB on rows selection
    set focus and press keys     ${rows_per_page}>div     TAB
    Element Should Be Focused    ${pagination_input}

select and unselect a checkbox when pressed space on table checkbox row
    Checkbox Should Not Be Selected    ${row_10_checkbox}
    set focus and press keys           ${row_10_checkbox}    SPACE
    Checkbox Should Be Selected        ${row_10_checkbox}
    Press Keys                         None    SPACE
    Checkbox Should Not Be Selected    ${row_10_checkbox}

show less rows when focus is on rows per page dropdown and is pressed UP ARROW
    set focus and press keys     ${rows_per_page}     TAB

pagination space: change the page index when SPACE is pressed on pagination button
    Textfield Value Should Be    ${pagination_input}    1
    set focus and press keys     ${pagination_next_page}     SPACE
    Textfield Value Should Be    ${pagination_input}    2
