*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open tabs sample
    [Arguments]    ${dir}    ${sample}
    Go To                            ${dir}navigation-tabs--${sample}
    Wait Until Element Is Enabled    ${tabs}


*** Variables ***
${tabs}    css:div[role=tablist]>button
${tab}     ${tabs}:nth-child
