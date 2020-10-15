*** Setting ***
Resource    _checkbox.resource


*** Test Cases ***
state transition flow
    [Setup]    open checkbox sample    main
    Element Attribute Value Should Be    ${checkbox}(3) input   data-indeterminate    true
    Click Element                        ${checkbox}(3)
    Element Attribute Value Should Be    ${checkbox}(3) input   data-indeterminate    false
    Checkbox Should Be Selected          ${checkbox}(3) input
    Click Element                        ${checkbox}(3)
    Checkbox Should Not Be Selected      ${checkbox}(3) input
    Click Element                        ${checkbox}(3)
    Checkbox Should Be Selected          ${checkbox}(3) input

select and unselect when clicks on input
    [Setup]    open checkbox sample    without-label
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    Checkbox Should Be Selected          ${checkbox}(2) input
    Checkbox Should Not Be Selected      ${checkbox}(3) input
    click Element                        ${checkbox}(1) input
    click Element                        ${checkbox}(2) input
    click Element                        ${checkbox}(3) input
    Checkbox Should Be Selected          ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(2) input
    Checkbox Should Be Selected          ${checkbox}(3) input

select and unselect when clicks on label
    [Setup]    open checkbox sample    main
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    Checkbox Should Be Selected          ${checkbox}(2) input
    Checkbox Should Not Be Selected      ${checkbox}(3) input
    click Element                        ${checkbox}(1) label
    click Element                        ${checkbox}(2) label
    click Element                        ${checkbox}(3) label
    Checkbox Should Be Selected          ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(2) input
    Checkbox Should Be Selected          ${checkbox}(3) input

impossible change checkbox when is disabled
    [Setup]    open checkbox sample    disabled
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1) label
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1)
    Checkbox Should Not Be Selected      ${checkbox}(1) input

impossible change checkbox when is readOnly
    [Setup]    open checkbox sample    read-only
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1) label
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1) input
    Checkbox Should Not Be Selected      ${checkbox}(1) input
    click Element                        ${checkbox}(1)
    Checkbox Should Not Be Selected      ${checkbox}(1) input

required checkbox selection
    [Setup]    open checkbox sample    required
    Checkbox Should Be Selected    ${checkbox}(1) input
    Page Should Not Contain        Required
    Unselect Checkbox              ${checkbox}(1) input
    Page Should Contain            Required

controlled checkbox
    [Setup]    open checkbox sample    controlled
    Checkbox Should Not Be Selected    ${checkbox}(1) input
    Checkbox Should Not Be Selected    ${checkbox}(2) input
    Select Checkbox                    ${checkbox}(2) input
    Checkbox Should Be Selected        ${checkbox}(1) input
    Checkbox Should Be Selected        ${checkbox}(2) input
