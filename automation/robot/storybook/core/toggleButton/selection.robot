*** Setting ***
Resource    ../_keywords.resource
Force Tags  v3


*** Test Cases ***
change the state to closed and opened when toggle button is clicked 2 times
    Go To                                ${forms}toggle-button--controlled
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false

change state when toggle button is focused and is pressed ENTER
    [Tags]    Keyboard
    Go To                                ${forms}toggle-button--controlled
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false

change state when toggle button is focused and is pressed SPACE
    [Tags]    Keyboard
    Go To                                ${forms}toggle-button--controlled
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false


*** Variables ***
${toggleButton}     css:[class*=HvToggleButton-root]
