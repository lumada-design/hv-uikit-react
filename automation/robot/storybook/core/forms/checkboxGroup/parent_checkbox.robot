*** Setting ***
Resource         _checkboxgroup.resource
Test Setup       open checkbox group sample    main
Documentation    verify states transitions


*** Test Cases ***
selected - indeterminate
    Select Checkbox                      ${all} input
    click Element                        ${checkbox2}
    Checkbox Should Not Be Selected      ${checkbox2} input
    Checkbox Should Be Selected          ${checkbox3} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    true

selected - unselected
    Select Checkbox                      ${all} input
    click Element                        ${all}
    Checkbox Should Not Be Selected      ${all} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    false
    Checkbox Should Not Be Selected      ${checkbox2} input
    Checkbox Should Not Be Selected      ${checkbox3} input
    Checkbox Should Not Be Selected      ${checkbox4} input

unselected - indeterminate
    Select Checkbox                      ${all} input
    Unselect Checkbox                    ${all} input
    Select Checkbox                      ${checkbox3} input
    Checkbox Should Not Be Selected      ${checkbox2} input
    Checkbox Should Not Be Selected      ${checkbox4} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    true

unselected - selected
    Select Checkbox                      ${all} input
    Unselect Checkbox                    ${all} input
    click Element                        ${all}
    Checkbox Should Be Selected          ${all} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    false
    Checkbox Should Be Selected          ${checkbox2} input
    Checkbox Should Be Selected          ${checkbox3} input
    Checkbox Should Be Selected          ${checkbox4} input

indeterminate - selected
    Select Checkbox                      ${all} input
    Unselect Checkbox                    ${all} input
    Select Checkbox                      ${checkbox2} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    true
    Select Checkbox                      ${checkbox3} input
    Select Checkbox                      ${checkbox4} input
    Checkbox Should Be Selected          ${all} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    false

indeterminate - unselected
    Select Checkbox                      ${all} input
    Unselect Checkbox                    ${checkbox2} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    true
    Unselect Checkbox                    ${checkbox3} input
    Unselect Checkbox                    ${checkbox4} input
    Checkbox Should Not Be Selected      ${all} input
    Element Attribute Value Should Be    ${checkboxGroup} input    data-indeterminate    false
