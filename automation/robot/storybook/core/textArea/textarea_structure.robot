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
    Wait Until Element Is Enabled    css:textarea                  7s
    Run Keyword If                   '${BROWSER.lower()}'=='ie'    Press Keys    css:input                 CTRL+A+DELETE    #IE11 vs chrome keyboards case incompatible
    ...                              ELSE                          Press Keys    css:input                 CTRL+a+DELETE
    Input Text                       css:input                     11            clear=True
    Click Button                     Second value
    Wait Until Keyword Succeeds      3                             1s            Element Text Should Be    css:textarea     Second valu

unable to insert text
    Go To                               ${STORYBOOK_URL}/iframe.html?id=components-text-area--disabled
    Wait Until Page Contains Element    css:textarea    7s
    Element Should Be Disabled          css:textarea
