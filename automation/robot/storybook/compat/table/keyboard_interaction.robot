*** Setting ***
Resource          _table.resource
Test Setup        open table sample    ${compatibility}    with-checkbox
Force Tags        keyboard
Documentation     https://www.w3.org/TR/wai-aria-practices/#table
...               mouse vs keyboard problem
...               https://github.com/lumada-design/hv-uikit-react/issues/1631


*** Test Cases ***
move focus to next sortable column header when pressed TAB on column header
    set focus and press keys             ${header}(2)     TAB
    Wait Until Page Contains Element     ${header}(2) ${button}:focus
    Press Keys                           None    TAB    TAB    TAB    TAB    TAB    TAB
    Wait Until Page Contains Element     ${header}(8) ${button}:focus

move focus to previous sortable column header when pressed SHIFT+TAB on column header
    set focus and press keys             ${header}(8)    SHIFT+TAB
    Wait Until Page Contains Element     ${header}(7) ${button}:focus

move focus to row selection when pressed TAB on last sortable column header
    [Documentation]    the column 9 should not receive focus
    set focus and press keys            ${header}(8)    TAB
    Wait Until Page Contains Element    ${header}(8) ${button}:focus
    Press Keys                          None    TAB
    Wait Until Page Contains Element    ${row}(1) ${checkBox}:focus

move focus to pagination when pressed TAB on rows selection
    set focus and press keys            ${rows_per_page}>div     TAB
    Wait Until Page Contains Element    ${nav_input}:focus

sort the column ascending and descending when is pressed ENTER focused column header
    set focus and press keys             ${header}(2)     TAB
    Wait Until Page Contains Element     ${header}(2) ${button}:focus
    Press Keys                           None    ENTER
    Wait Until Page Contains Element     ${header}(2)[aria-sort=ascending]
    Press Keys                           None    ENTER
    Wait Until Page Contains Element     ${header}(2)[aria-sort=descending]

sort the column ascending and descending when is pressed SPACE focused column header
    set focus and press keys             ${header}(2)     TAB
    Wait Until Page Contains Element     ${header}(2) ${button}:focus
    Press Keys                           None    SPACE
    Wait Until Page Contains Element     ${header}(2)[aria-sort=ascending]
    Press Keys                           None    SPACE
    Wait Until Page Contains Element     ${header}(2)[aria-sort=descending]

select and unselect a checkbox when pressed space on table checkbox row
    Checkbox Should Not Be Selected    ${row}(10) ${checkBox}
    set focus and press keys           ${row}(10) ${checkBox}    SPACE
    Checkbox Should Be Selected        ${row}(10) ${checkBox}
    Press Keys                         None    SPACE
    Checkbox Should Not Be Selected    ${row}(10) ${checkBox}

change the page index when SPACE is pressed on pagination button
    Textfield Value Should Be    ${nav_input}    1
    set focus and press keys     ${nav_next_page}     SPACE
    Textfield Value Should Be    ${nav_input}    2


*** Variables ***
${button}    [role=button]
