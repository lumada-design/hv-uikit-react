*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open toggle button sample
    [Arguments]     ${sample}
    go to                            ${components}toggle-button--${sample}
    Wait Until Element Is Visible    ${buttons}

toggle button should be selected
    [Arguments]    ${locator}    ${nameAttribute}
    Element Attribute Value Should Be    ${locator}    aria-pressed    true
    Element Attribute Value Should Be    ${locator}>div    name    ${nameAttribute}

toggle button should not be selected
    [Arguments]    ${locator}    ${nameAttribute}
    Element Attribute Value Should Be    ${locator}    aria-pressed    false
    Element Attribute Value Should Be    ${locator}>div    name    ${nameAttribute}


*** Variables ***
${buttons}    css:button.HvToggleButton-root
${button}     ${buttons}:nth-child
