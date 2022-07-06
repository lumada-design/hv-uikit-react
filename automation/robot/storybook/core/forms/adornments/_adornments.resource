*** Setting ***
Resource    ../../_keywords.resource


*** keywords ***
open adornment sample
    [Arguments]    ${dir}    ${sample}
    Go To    ${dir}forms-form-element--${sample}
    Wait Until Element Is Enabled    ${input}


*** Variables ***
${adornment_accepted}    css:div[name*=Success]
${adornment_failed}      css:div[name*=Fail]
${clean_button}          css:div[name*=Close]
${input}                 css:#controlled-input
${label}                 css:#controlled-input-label
