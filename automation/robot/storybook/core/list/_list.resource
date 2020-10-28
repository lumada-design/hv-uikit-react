*** Setting ***
Resource     ../_keywords.resource


*** Keywords ***
open test list sample
    [Arguments]    ${sample}
    Go To                            ${tests}list--${sample}
    Wait Until Element Is Visible    ${list}

list option should be selected
    [Arguments]    ${locator}
    Element Attribute Value Should Be    ${locator}    aria-selected    true

list option should not be selected
    [Arguments]    ${locator}
    [Documentation]    may be "${None}" or "false"
    ${aria-selected}    Get Element Attribute    ${locator}    aria-selected
    Run Keyword If                               '${aria-selected}'!='${None}'
    ...   Element Attribute Value Should Be      ${locator}    aria-selected    false


*** Variables ***
${allOption}        css:#list-select-all
${list}             css:.HvList-root
${option}           ${list} li:nth-child
${selectedItems}    css:li[aria-selected='true']
