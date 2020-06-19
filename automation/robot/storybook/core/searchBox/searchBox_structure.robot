*** Setting ***
Resource          ../../_resources/keywords.resource
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
submit a search
    Go To                            ${components}searchbox--main
    Wait Until Element Is Enabled    css:input[type='text']
    Input Text                       css:input[type='text']                     B
    Wait Until Element Is Visible    //*[contains(.,'B second suggestion')]

unable to submit a search
    Go To                               ${components}searchbox--disabled
    Wait Until Page Contains Element    css:input[type='text']
    Element Should Be Disabled          css:input[type='text']
