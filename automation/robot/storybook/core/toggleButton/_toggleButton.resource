*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open toggle button sample
    [Arguments]     ${sample}
    go to                            ${components}inputs-toggle-button--${sample}
    Wait Until Element Is Visible    ${buttons}

toggle button should be selected
    [Arguments]    ${locator}    ${nameAttribute}
    Wait Until Page Contains Element     ${locator}\[aria-pressed=true]
    Wait Until Page Contains Element     ${locator} \[name=${nameAttribute}]

toggle button should not be selected
    [Arguments]    ${locator}    ${nameAttribute}
    Wait Until Page Contains Element     ${locator}\[aria-pressed=false]
    Wait Until Page Contains Element     ${locator} \[name=${nameAttribute}]


*** Variables ***
${buttons}    css:button.HvButton-root
${button}     ${buttons}:nth-child
