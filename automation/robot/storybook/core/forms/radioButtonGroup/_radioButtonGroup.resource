*** Setting ***
Resource    ../../_keywords.resource


*** Keywords ***
open radio button group sample
    [Arguments]    ${sample}
    go to                            ${components}inputs-radio-button-group--${sample}
    Wait Until Element Is Enabled    ${radioButtonGroup}

radioButton should be selected
    [Arguments]     ${cssLocator}
    Element Attribute Value Should Be    ${cssLocator} input+div   name    RadioButtonSelected

radioButton should not be selected
    [Arguments]     ${cssLocator}
    Element Attribute Value Should Be    ${cssLocator} input+div   name    RadioButtonUnselected


**** Variables ***
${label}               css:.HvRadioGroup-label
${radioButtonGroup}    css:.HvRadioGroup-root
${radioButtons}        css:.HvRadio-root
${radio}               ${radioButtons}\:nth-child
