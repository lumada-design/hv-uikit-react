*** Setting ***
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       open storybook    ${iframe changingData}
Test Setup        Run Keywords
...               Reload Page    AND
...               Wait Until Page Contains Element    ${table1 all}    10s
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
selection count label is correctly updated when is added values or removed
    Select CheckBox           ${checkBox 1}
    Select CheckBox           ${checkBox 5}
    Select CheckBox           ${checkBox 6}
    Element Text Should Be    ${table1 label}    2 of 5   ignore_case:True
    Element Text Should Be    ${table2 label}    1 of 5   ignore_case:True
    Click Button              Disable selected
    Select CheckBox           ${table1 all}
    Element Text Should Be    ${table1 label}    3 of 3   ignore_case:True
    Element Text Should Be    ${table2 label}    1 of 7   ignore_case:True

selection count label is correctly updated when hidden values are added or removed
    Select CheckBox           ${table1 all}
    Click Button              Disable selected
    click Button              ${table2 nextPage}
    Select CheckBox           ${checkBox 6}
    Select CheckBox           ${checkBox 10}
    click Button              ${table2 previousPage}
    Click Button              Enable selected
    Select CheckBox           ${table1 all}
    Select CheckBox           ${table2 all}
    Element Text Should Be    ${table1 label}    2 of 2   ignore_case:True
    Element Text Should Be    ${table2 label}    8 of 8   ignore_case:True

selection count label is correctly updated when pass from all to indeterminate
    Select CheckBox           ${table1 all}
    Element Text Should Be    ${table1 label}    5 of 5   ignore_case:True
    Unselect CheckBox         ${checkBox 1}
    Element Text Should Be    ${table1 label}    4 of 5   ignore_case:True

selection count label is correctly updated when is not selected any value
    Select CheckBox           ${table1 all}
    Select CheckBox           ${checkBox 6}
    Click Button              Enable selected
    Element Text Should Be    ${table1 label}    5 of 6   ignore_case:True


*** Variables ***
${checkBox 1}             id:select-1-input
${checkBox 10}            id:select-10-input
${checkBox 5}             id:select-5-input
${checkBox 6}             id:select-6-input
${iframe changingData}    ${STORYBOOK_URL}/iframe.html?id=visualizations-table--table-with-changing-data
${table1 all}             id:table1-select-all-input
${table1 label}           css:#table1-select-all + p
${table2 all}             id:table2-select-all-input
${table2 label}           css:#table2-select-all + p
${table2 nextPage}        id:table2-pagination-nextPage-button
${table2 previousPage}    id:table2-pagination-previousPage-button