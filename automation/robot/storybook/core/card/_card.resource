*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open card sample
    [Arguments]    ${dir}    ${sample}
    Go To                            ${dir}display-card--${sample}
    Wait Until Element Is Enabled    ${card}


*** Variables ***
${aboveFooter}    ${card} [aria-selected]
${card}           css:.HvCard-root
${checkbox}       ${card} input[type=checkbox]
${content}        ${card} .HvCardContent-content
${footer}         ${card} .HvActionBar-root > div[style]
${header}         ${card} .HvCardHeader-title
${subHeader}      ${card} .HvCardHeader-subheader
${dropMenu}       ${card} \[aria-label='Dropdown menu']
