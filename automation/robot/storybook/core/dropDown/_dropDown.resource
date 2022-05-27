*** Setting ***
Resource          ../_keywords.resource


*** Keywords ***
open dropdown sample
    [Arguments]    ${dir}    ${sample}
    Go To                            ${dir}inputs-dropdown--${sample}
    Wait Until Element Is Enabled    ${dropdown}
    ${count}    Get Element Count	 ${listContainer}
    Run Keyword If                   ${count}==0
    ...    Click Element             ${dropdown}
    Wait Until Element Is Enabled    ${listContainer}


*** Variables ***
${aria-selected}     css:[aria-selected=true]
${buttonApply}       css:button[id*=apply]
${buttonCancel}      css:button[id*=cancel]
${dropdown}          css:[role=combobox]
${dropdownHeader}    css:div[id*=dropdown][id*=header]
${listBox}           css:ul[role='listbox']
${listContainer}     css:.HvDropdownList-listContainer
${option}            css:ul[role=listbox]>li:nth-child
${options}           css:ul[role=listbox]>li
${searchInput}       css:input[type=search]
${selectAll}         css:input[id*='select-all']
