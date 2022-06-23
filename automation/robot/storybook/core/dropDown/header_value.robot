*** Setting ***
Resource         _dropDown.resource
Documentation    Verify value on top head section of dropdown for uses cases:


*** Test Cases ***
api select item
    [Setup]    Go To    ${tests}dropdown--single-selected-value
    Wait Until Page Contains Element    ${dropdownHeader}
    Element Text Should Be     ${dropdownHeader}    Value 3    ignore_case=True

select an item
    [Setup]    open dropdown sample      ${inputs}    single-selection-no-selection
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True
    click Element                        ${option}(2)
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    Value 2    ignore_case=True

unselect an item
    [Setup]    Go To      ${tests}dropdown--single-selected-value
    Wait Until Page Contains Element    ${dropdownHeader}
    Element Text Should Be               ${dropdownHeader}    Value 3    ignore_case=True
    click Element                        ${option}(3)
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True

multi selection is changed
    [Setup]    open dropdown sample      ${inputs}    multi-selection
    Element Text Should Be               ${dropdownHeader}    1 / 4
    click Element                        ${option}(3)
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    2 / 4
