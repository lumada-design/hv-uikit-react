*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open radioButton sample
    [Arguments]     ${sample}
    go to                            ${inputs}radio-button--${sample}
    Wait Until Element Is Enabled    ${radioButtons}

radioButton should be selected
    [Arguments]     ${cssLocator}
    Element Attribute Value Should Be    ${cssLocator} input+div   name    RadioButtonSelected

radioButton should not be selected
    [Arguments]     ${cssLocator}
    Element Attribute Value Should Be    ${cssLocator} input+div   name    RadioButtonUnselected


*** Variables ***
${radioButtons}    css:.HvRadio-root
${radio}           ${radioButtons}\:nth-child
