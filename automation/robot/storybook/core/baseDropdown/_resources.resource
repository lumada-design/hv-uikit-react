*** Setting ***
Resource    ../_keywords.resource


*** Keywords ***
open basedropdown sample
    [Arguments]    ${sample}
    Go To    ${tests}base-dropdown--${sample}
    Wait Until Element Is Enabled    ${dropdown}


*** Variables ***
${dropdown}                       css:.HvBaseDropdown-root
${dropdownHeader}                 css:.HvBaseDropdown-header
${container}                      css:.HvBaseDropdown-panel
