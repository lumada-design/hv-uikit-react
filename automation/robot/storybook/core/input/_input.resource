*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open input sample
    [Arguments]    ${dir}    ${sample}
    go to                            ${dir}input--${sample}
    Wait Until Element Is Enabled    ${input}


*** Variables ***
${adornment_accepted}    css:div[name*='Success']
${adornment_failed}      css:div[name*='Fail']
${clean_button}          css:div[name*='Close']
${description}           css:.HvInput-description
${helperText}            css:#password-input-error
${input}                 css:input
${label}                 css:#limited-input-label
