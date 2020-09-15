*** Setting ***
Resource         _resources.resource
Force Tags       v3
Documentation    Verify value on top head section of dropdown for uses cases:


*** Test Cases ***
api selectDefault
    [Tags]    run-any-way
    [Documentation]    https://insightgroup.atlassian.net/browse/HVUIKIT-5531
    Go To                            ${patterns}dropdown--single-selection
    Wait Until Element Is Visible    ${dropdown}
    Run Keyword And Expect Error     *
    ...    Element Text Should Be    ${dropdownHeader}    Value 1    ignore_case=True

api select item
    Go To                            ${tests}dropdown--single-selected-value
    Wait Until Element Is Visible    ${dropdown}
    Element Text Should Be           ${dropdownHeader}    Value 3    ignore_case=True

user selected item
    Go To                                ${patterns}dropdown--single-selection
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}
    click Element                        ${option2}
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    Value 2    ignore_case=True

user unselect item
    Go To                                ${tests}dropdown--single-selected-value
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    Value 3    ignore_case=True
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}
    click Element                        ${option3}
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    Select...    ignore_case=True

multi selection is changed
    Go To                                ${patterns}dropdown--multi-selection
    Wait Until Element Is Visible        ${dropdown}
    Element Text Should Be               ${dropdownHeader}    1 / 4
    Click Element                        ${dropdownHeader}
    Wait Until Element Is Visible        ${listBox}
    click Element                        ${option3}
    Click Button                         Apply
    Wait Until Element Is Not Visible    ${listBox}
    Element Text Should Be               ${dropdownHeader}    2 / 4
