*** Setting ***
Resource    ../_keywords.resource
Force Tags    v3


*** Test Cases ***
change input content with another component
    Go To                            ${forms}text-area--controlled-validation
    Wait Until Element Is Enabled    css:textarea
    Element Text Should Be           css:textarea      Initial State
    Page Should Not Contain          This text area is invalid
    Click Button                     invalid
    Wait Until Page Contains         This text area is invalid

change input limit with another component
    Go To                            ${forms}text-area--controlled-limited
    Wait Until Element Is Enabled    css:input
    Click Element                    css:input
    Wait Until Element Is Visible    ${button clean input}
    Click Button                     ${button clean input}
    Input Text                       css:input    11
    Click Button                     Second value
    Wait Until Element Contains      css:textarea    Second valu

unable to insert text
    Go To                               ${forms}text-area--disabled
    Wait Until Page Contains Element    css:textarea
    Element Should Be Disabled          css:textarea


*** Variables ***
${button clean input}   css:button[aria-label='Clear the text']
