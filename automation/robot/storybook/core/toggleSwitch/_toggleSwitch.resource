*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open toggle switch sample
    [Arguments]     ${sample}
    go to                            ${inputs}switch--${sample}
    Wait Until Element Is Visible    ${switches}


*** Variables ***
${switch}         ${switches}:nth-child
${switches}       css:.HvSwitch-root
${warningText}    css:.HvWarningText-root
