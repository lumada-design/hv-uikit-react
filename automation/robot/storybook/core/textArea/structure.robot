*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
change input content with another component
    [Setup]    open textarea sample    ${tests}    controlled-validation
    Element Text Should Be      ${textarea}    Initial State
    Page Should Not Contain     This text area is invalid
    Click Button                invalid
    Wait Until Page Contains    This text area is invalid

change input limit with another component
    [Setup]    open textarea sample    ${tests}    controlled-limited
    Click Element                    ${input}
    Wait Until Element Is Visible    ${cleanText}
    Click Button                     ${cleanText}
    Input Text                       ${input}    11
    Click Button                     Second value
    Wait Until Element Contains      ${textarea}    Second valu

unable to insert text
    [Setup]    go to    ${inputs}text-area--disabled
    Wait Until Page Contains Element    ${textarea}
    Element Should Be Disabled          ${textarea}


*** Keywords ***
open textarea sample
    [Arguments]    ${dir}    ${sample}
    go to                            ${dir}text-area--${sample}
    Wait Until Element Is Enabled    ${textarea}


*** Variables ***
${cleanText}    css:button[aria-label='Clear the text']
${textarea}     css:textarea
${input}        css:input
