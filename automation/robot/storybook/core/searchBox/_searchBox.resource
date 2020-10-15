*** Setting ***
Resource      ../_keywords.resource


*** Variables ***
${searchBox}       css:.HvInput-root
${clearButton}     ${searchBox} [name=CloseXS]
${searchButton}    ${searchBox} button[aria-label=Search]
${resultItems}     css:.HvPanel-root>div
${suggestion}      ${searchBox} li


*** Keywords ***
open searchBox sample
    [Arguments]    ${sample}
    Go To     ${forms}search-box--${sample}
    Wait Until Element Is Enabled      ${searchBox}
