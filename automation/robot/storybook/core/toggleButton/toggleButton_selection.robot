*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
change the state to closed and opened when toggle button is clicked 2 times
    Go To                                ${components}selectors-toggle-button--main
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false

change state when toggle button is focused and is pressed ENTER
    [Tags]    Keyboard
    Go To                                ${components}selectors-toggle-button--main
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false

change state when toggle button is focused and is pressed SPACE
    [Tags]    Keyboard
    Go To                                ${components}selectors-toggle-button--main
    Wait Until Element Is Visible        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false


*** Variables ***
${toggleButton}     css:[class*=HvToggleButton-root]
