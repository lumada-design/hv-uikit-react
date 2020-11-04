*** Setting ***
Resource       ../_keywords.resource


*** Keywords ***
open userPreferences sample
    [Arguments]    ${dir}    ${sample}
    Go To                            ${dir}user-preferences--${sample}
    Wait Until Element Is Enabled    ${userPreferences}


*** Variables ***
${action}             css:#action1
${option}             css:#option
${userPreferences}    css:.HvUserPreferences-root
${buttonBottom}       css:#buttonBottom
${buttonTop}          css:#buttonTop
