*** Setting ***
Resource         _resources.resource
Documentation    Verify value on top head section of dropdown for uses cases:


*** Test Cases ***
api select item
    Go To                            ${tests}dropdown--single-selected-value
    Wait Until Element Is Visible    ${dropdown}
    Element Text Should Be           ${dropdownHeader}    Value 3    ignore_case=True

select an item
    Go To                                ${forms}dropdown--single-selection-no-selection
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}
    click Element                        ${option2}
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    Value 2    ignore_case=True

unselect an item
    Go To                                ${tests}dropdown--single-selected-value
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    Value 3    ignore_case=True
    click Element                        ${option3}
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True

multi selection is changed
    Go To                                ${forms}dropdown--multi-selection
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    1 / 4
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}
    click Element                        ${option3}
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    2 / 4
