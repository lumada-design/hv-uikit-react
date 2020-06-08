*** Setting ***
Resource         ../../_resources/accessibility.robot
Test Template    pa11y should not find errors
Force Tags       pa11y


*** Test Cases ***
Input Custom Validation        ${components}input--custom-validation
Input Initial State            ${components}input--invalid-state
Input No Validation            ${components}input--no-validation
Input Simple With Icon Info    ${components}input--with-icon-info
Input Custom Props             ${components}input--custom-props
Input Default Value            ${components}input--default-value
Input Email                    ${components}input--email
Input Events                   ${components}input--event-demostration
Input Max                      ${components}input--limited
Input Max Numeric              ${components}input--numeric-limited
Input Password                 ${components}input--password
Input Required Max Numeric     ${components}input--numeric-required
Input Simple                   ${components}input--main
Input Suggestions              ${components}input--suggestion
Input Uncontrolled Value       ${components}input--controlled-with-buttons
