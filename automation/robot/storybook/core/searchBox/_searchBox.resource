*** Setting ***
Resource      ../_keywords.resource


*** Keywords ***
open searchBox sample
    [Arguments]    ${sample}
    Go To     ${components}inputs-search-box--${sample}
    Wait Until Element Is Enabled      ${searchBox}


*** Variables ***
${searchBox}       css:.HvInput-root
${clearButton}     ${searchBox} [name=CloseXS]
${searchButton}    ${searchBox} button[aria-label=Search]
${resultItems}     css:.HvPanel-root>div
${suggestion}      ${searchBox} li
