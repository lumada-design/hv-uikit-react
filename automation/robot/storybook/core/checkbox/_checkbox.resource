*** Setting ***
Resource    ../_keywords.resource


*** Variables ***
${checkboxs}    css:.HvCheckBox-root
${checkbox}     css:.HvCheckBox-root:nth-child


*** Keywords ***
open checkbox sample
    [Arguments]    ${sample}
    go to                            ${inputs}checkbox--${sample}
    Wait Until Element Is Enabled    ${checkboxs}
