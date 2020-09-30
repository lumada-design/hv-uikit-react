*** Setting ***
Resource    ../../_keywords.resource


*** Keywords ***
open radio button group sample
    [Arguments]    ${sample}
    go to                            ${components}forms-radio-button-group--${sample}
    Wait Until Element Is Enabled    ${radioButtonGroup}


**** Variables ***
${label}               css:.HvRadioGroup-label
${radioButton1}        css:#hv-form-element-4
${radioButton2}        css:#hv-form-element-6
${radioButton3}        css:#hv-form-element-8
${radioButtonGroup}    css:.HvRadioGroup-root
${radioButtons}        css:[role=radiogroup]
