*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
change input content with another component
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-text-area--controlled
    Wait Until Element Is Enabled    css:textarea      7s
    Element Text Should Be           css:textarea      Initial State
    Click Button                     First value
    Element Text Should Be           css:textarea      First value
    Click Button                     Second value
    Element Text Should Be           css:textarea      Second value

change input limit with another component
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-text-area--controlled-limited
    Wait Until Element Is Enabled    css:input    7s
    Click Element                    css:input
    Wait Until Element Is Visible    ${button clean input}    timeout=10s
    Click Button                     ${button clean input}
    Input Text                       css:input    11
    Click Button                     Second value
    Wait Until Element Contains      css:textarea    Second valu    timeout=10s

unable to insert text
    Go To                               ${STORYBOOK_URL}/iframe.html?id=components-text-area--disabled
    Wait Until Page Contains Element    css:textarea    7s
    Element Should Be Disabled          css:textarea


*** Variables ***
${button clean input}   css:button[aria-label='Clear the text']