*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
change input content with another component
    Go To                            ${components}text-area--controlled
    Wait Until Element Is Enabled    css:textarea
    Element Text Should Be           css:textarea      Initial State
    Click Button                     First value
    Element Text Should Be           css:textarea      First value
    Click Button                     Second value
    Element Text Should Be           css:textarea      Second value

change input limit with another component
    Go To                            ${components}text-area--controlled-limited
    Wait Until Element Is Enabled    css:input
    Click Element                    css:input
    Wait Until Element Is Visible    ${button clean input}
    Click Button                     ${button clean input}
    Input Text                       css:input    11
    Click Button                     Second value
    Wait Until Element Contains      css:textarea    Second valu

unable to insert text
    Go To                               ${components}text-area--disabled
    Wait Until Page Contains Element    css:textarea
    Element Should Be Disabled          css:textarea


*** Variables ***
${button clean input}   css:button[aria-label='Clear the text']
