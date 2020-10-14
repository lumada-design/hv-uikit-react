*** Setting ***
Resource      ../_keywords.resource


*** Variables ***
${searchBox}      css:#dynamic
${clearButton}    ${searchBox} [name=CloseXS]


*** Keywords ***
open searchBox sample
    [Arguments]    ${sample}
    Go To     ${forms}search-box--${sample}
    Wait Until Element Is Enabled      ${searchBox}
