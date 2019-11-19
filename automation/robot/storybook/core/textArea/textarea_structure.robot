*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
change input content with another component
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretextarea--textareauncontrolledvalue
    Wait Until Element Is Enabled    css:textarea      10s
    Element Text Should Be           css:textarea      Initial State
    Click Button                     First value
    Element Text Should Be           css:textarea      First value
    Click Button                     Second value
    Element Text Should Be           css:textarea      Second value

change input limit with another component
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coretextarea--textareauncontrolledvaluelimit
    Wait Until Element Is Enabled    css:textarea    10s
    Input Text                       css:input       20
    Element Text Should Be           //div[contains(@class,'HvTextArea-characterCounte')]    10/20
    Input Text                       css:textarea    A aB bC cD dE eF fGgH hI iJ jK kL lM mN nO oP pQ qR rS sT tU uV vW wX xY yZ z
    Element Text Should Be           css:textarea    A aB bC cD dE eF fGg

unable to insert text
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coretextarea--textareadisabled
    Wait Until Page Contains Element    css:textarea    10s
    Element Should Be Disabled          css:textarea
