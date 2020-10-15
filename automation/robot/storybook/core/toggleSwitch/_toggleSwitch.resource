*** Setting ***
Resource    ../_keywords.resource


*** Variables ***
${switch}         ${switches}:nth-child
${switches}       css:.HvSwitch-root
${warningText}    css:.HvWarningText-root


*** Keywords ***
open toggle switch sample
    [Arguments]     ${sample}
    go to                            ${forms}switch--${sample}
    Wait Until Element Is Visible    ${switches}
