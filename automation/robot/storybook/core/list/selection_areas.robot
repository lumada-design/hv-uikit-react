*** Setting ***
Resource         _list.resource
Test Template    select list option when locator area is clicked
Documentation    select a option clicking in different areas of locator


*** Test Cases ***      sample                             option          locator
click on icon           single-selection-with-icon         ${option}(1)    div
click on radiobutton    single-selection-with-selectors    ${option}(3)    input
click on label          single-selection-with-selectors    ${option}(5)    label
click on checkbox       multi-selection-with-select-all    ${option}(5)    input


*** Keywords ***
select list option when locator area is clicked
    [Arguments]    ${sample}    ${option}    ${locator}
    open test list sample                     ${sample}
    list option should not be selected   ${option}
    Click Element                        ${option} ${locator}
    list option should be selected       ${option}
