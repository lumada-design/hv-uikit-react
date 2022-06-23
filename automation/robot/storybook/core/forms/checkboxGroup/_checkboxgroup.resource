*** Setting ***
Resource    ../../_keywords.resource


*** Keywords ***
open checkbox group sample
    [Arguments]    ${sample}
    go to                            ${inputs}checkbox-group--${sample}
    Wait Until Element Is Enabled    ${checkboxGroup}


**** Variables ***
${all}              css:.HvCheckBoxGroup-selectAll
${checkbox1}        css:.HvCheckBoxGroup-group>div:nth-child(1)
${checkbox2}        css:.HvCheckBoxGroup-group>div:nth-child(2)
${checkbox3}        css:.HvCheckBoxGroup-group>div:nth-child(3)
${checkbox4}        css:.HvCheckBoxGroup-group>div:nth-child(4)
${checkboxGroup}    css:.HvCheckBoxGroup-root
${label}            css:\#main-label
