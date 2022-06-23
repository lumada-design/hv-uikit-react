*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open modal sample
    [Arguments]    ${dir}    ${sample}
    go to                            ${dir}dialog--${sample}
    Wait Until Element Is Enabled    css:button.HvButton-root


*** Variables ***
${buttonApply}          id:apply
${buttonCancel}         id:cancel
${buttonWarning}        xpath://button[contains(.,'Warning')]
${dialog}               css:div[role='dialog']
${dialogCloseButton}    id:test-close
${input}                css:input[type='text']
