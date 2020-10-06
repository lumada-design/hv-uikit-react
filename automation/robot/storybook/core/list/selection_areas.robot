*** Setting ***
Variables        variables.yaml
Resource         ../_keywords.resource
Test Template    select an option by locator
Documentation    select a option clicking in different areas icon, label, input


*** Keywords ***
select an option by locator
    [Arguments]                          ${sample}                     ${option}        ${locator}
    Go To                                ${components}list--${sample}
    Wait Until Element Is Visible        ${list}
    Click Element                        css:#${option} ${locator}
    Element Attribute Value Should Be    ${option}                     aria-selected    true


*** Test Cases ***                       sample                             option        locator
single select clicking on icon           single-selection-with-icon         ${option1}    div
single select clicking on radiobutton    single-selection-with-selectors    ${option3}    input
multi select clicking on checkbox        multi-selection-with-select-all    ${option5}    input
