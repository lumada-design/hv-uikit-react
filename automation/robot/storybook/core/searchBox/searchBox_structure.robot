*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
submit a search
    [Tags]    bug-infrastructure-ie
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coresearchbox--simplesearchbox
    Wait Until Element Is Enabled    css:input[type='text']                     10s
    Input Text                       css:input[type='text']                     B
    Wait Until Element Is Visible    //*[contains(.,'B second suggestion')]    3s

unable to submit a search
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coresearchbox--disabledsearchbox
    Wait Until Page Contains Element    css:input[type='text']
    Element Should Be Disabled          css:input[type='text']
