*** Setting ***
Resource      ../_keywords.resource


*** Variables ***
${searchBox}      css:#hv-form-element-1
${clearButton}    ${searchBox} [name=CloseXS]


*** Keywords ***
open searchBox sample
    [Arguments]    ${sample}
    Go To     ${forms}search-box--${sample}
    Wait Until Element Is Enabled      ${searchBox}
