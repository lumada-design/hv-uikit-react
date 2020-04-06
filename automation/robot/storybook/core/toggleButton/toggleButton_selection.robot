*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke              


*** Test Cases ***
change the state to closed and opened when toggle button is clicked 2 times 
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--sample1
    Wait Until Element Is Visible        ${toggleButton}    10s
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    Element Attribute Value Should Be    ${toggleButton}    title           Open
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    true
    Element Attribute Value Should Be    ${toggleButton}    title           Closed
    Click Element                        ${toggleButton}
    Element Attribute Value Should Be    ${toggleButton}    aria-pressed    false
    Element Attribute Value Should Be    ${toggleButton}    title           Open       

change state when toggle button is focused and is pressed ENTER
    [Tags]    Keyboard
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--sample1
    Wait Until Element Is Visible        ${toggleButton}    10s
    Element Attribute Value Should Be    ${toggleButton}    title    Open
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    title    Closed
    set focus and press keys             ${toggleButton}    ENTER
    Element Attribute Value Should Be    ${toggleButton}    title    Open

change state when toggle button is focused and is pressed SPACE
    [Tags]    Keyboard
    Go To                                ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--sample1
    Wait Until Element Is Visible        ${toggleButton}    10s
    Element Attribute Value Should Be    ${toggleButton}    title    Open
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    title    Closed
    set focus and press keys             ${toggleButton}    SPACE
    Element Attribute Value Should Be    ${toggleButton}    title    Open


*** Variables *** 
${toggleButton}     css:[class*=HvToggleButton-root]
