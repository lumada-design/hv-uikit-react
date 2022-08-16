*** Setting ***
Resource         ../_table.resource
Test Setup       open table sample    ${compatibility}    table-with-changing-data
Documentation    bug-ie-webdriver https://github.com/lumada-design/hv-uikit-react/issues/1708


*** Test Cases ***
selection count label 1 is correctly updated when is removed rows
    [Documentation]    selection vs bulk actions
    Select CheckBox                ${checkBox 1}
    Select CheckBox                ${checkBox 5}
    Click Button                   Disable
    Select CheckBox                ${table1 all}
    Wait Until Element Contains    ${table1 label}    3 / 3

selection count label 2 is correctly updated when is added rows
    [Documentation]    selection vs bulk actions
    Select CheckBox                ${checkBox 1}
    Select CheckBox                ${checkBox 5}
    Select CheckBox                ${checkBox 6}
    Click Button                   Disable
    Wait Until Element Contains    ${table2 label}    1 / 7

selection count label 1 is correctly updated when hidden values are added
    [Documentation]    selection vs bulk actions vs pagination
    remove all rows of table1
    select 2 hidden rows
    Click Button              Enable
    Select CheckBox           ${table1 all}
    Element Should Contain    ${table1 label}    2 / 2

selection count label 2 is correctly updated when hidden values are removed
    [Documentation]    selection vs bulk actions vs pagination
    remove all rows of table1
    select 2 hidden rows
    Click Button                   Enable
    Select CheckBox                ${table2 all}
    Wait Until Element Contains    ${table2 label}    5 / 8


*** Keywords ***
remove all rows of table1
    Select CheckBox    ${table1 all}
    Click Button       Disable

select 2 hidden rows
    click Button       ${table2 nextPage}
    Select CheckBox    ${checkBox 6}
    Select CheckBox    ${checkBox 10}
    click Button       ${table2 previousPage}


*** Variables ***
${checkBox 1}             id:select-1-input
${checkBox 10}            id:select-10-input
${checkBox 5}             id:select-5-input
${checkBox 6}             id:select-6-input
${table1 all}             id:table1-select-all-select-input
${table1 label}           id:table1-select-all-select
${table2 all}             id:table2-select-all-select-input
${table2 label}           id:table2-select-all-select
${table2 nextPage}        id:table2-pagination-nextPage-button
${table2 previousPage}    id:table2-pagination-previousPage-button
