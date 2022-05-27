*** Setting ***
Resource      _dropDown.resource
Test Setup    open dropdown sample    ${components}    multi-selection


*** Test Cases ***
Open and close dropdown when is clicked header section
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Not Visible    ${listBox}

close dropdown when Apply button is clicked
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}

select all options when checked all option
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Button                     Apply
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${listBox}
    Page Should Contain Element      ${aria-selected}    limit=4

unselect all when is unselected all options one by one
    Element Attribute Value Should Be    ${option}(2)    aria-selected    true
    Click Element                        ${option}(2)
    Page Should Not Contain Element      ${aria-selected}
    Click Button                         Apply
    Click Element                        ${dropdown}
    Wait Until Element Is Visible        ${listBox}
    Page Should Not Contain Element      ${aria-selected}

unselect all options when unchecked all option
    Page Should Contain Element        ${aria-selected}    limit=1
    Click Element                      ${selectAll}
    Page Should not Contain Element    ${aria-selected}
    Click Button                       Apply
    Click Element                      ${dropdown}
    Wait Until Element Is Visible      ${listBox}
    Page Should not Contain Element    ${aria-selected}

show indeterminate state when just some options are selected
    Element Attribute Value Should Be    ${selectAll}    data-indeterminate    true

cancel selection when is clicked out of dropdown area
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Element                    css:body
    Click Element                    ${dropdown}
    Wait Until Element Is Visible    ${listBox}
    Page Should Contain Element      ${aria-selected}    limit=1

cancel selection when activated cancel button
    Page Should Contain Element      ${aria-selected}    limit=1
    Click Element                    ${selectAll}
    Click Element                    ${selectAll}
    Page Should Contain Element      ${aria-selected}    limit=4
    Click Button                     Cancel
    Click Element                    ${dropdown}
    Page Should Contain Element      ${aria-selected}    limit=1
