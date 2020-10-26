*** Setting ***
Resource      _checkboxgroup.resource
Test Setup    open checkbox group sample    main


*** Test Cases ***
checkbox group has id
    Element Attribute Value Should Be    ${checkboxGroup}    id    hv-form-element-2

children checkboxes have name attribute
    Page Should Contain Element    ${checkboxGroup}\ input[name]    limit=3

click on label
    Click Element                   ${checkbox1} label
    Checkbox Should Be Selected     ${checkbox1} input

click on checkbox
    Click Element                   ${checkbox1} input
    Checkbox Should Be Selected     ${checkbox1} input

click on option area
    Click Element                   ${checkbox1}
    Checkbox Should Be Selected     ${checkbox1} input

required at least one selection
    [Setup]    open checkbox group sample    required
    Unselect Checkbox                   ${checkbox2} input
    wait Until Page Contains            Required
    Select Checkbox                     ${checkbox2} input
    wait Until Page Does Not Contain    Required

is not editable when is read only
    [Setup]    open checkbox group sample    read-only
    Click Element                      ${checkbox2}
    Checkbox Should Not Be Selected    ${checkbox2} input
    Click Element                      ${checkbox3}
    Checkbox Should be Selected        ${checkbox3} input
    Click Element                      ${checkbox4}
    Checkbox Should Not Be Selected    ${checkbox4} input

not editable when is disabled
    [Setup]    open checkbox group sample    disabled
    Click Element                      ${all}
    Checkbox Should Not Be Selected    ${all} input
    Click Element                      ${checkbox2}
    Checkbox Should Not Be Selected    ${checkbox2} input
    Click Element                      ${checkbox3}
    Checkbox Should be Selected        ${checkbox3} input
    Click Element                      ${checkbox4}
    Checkbox Should Not Be Selected    ${checkbox4} input
