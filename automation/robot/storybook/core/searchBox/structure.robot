*** Setting ***
Force Tags  v3
Resource    ../_keywords.resource


*** Test Cases ***
submit a search
    Go To                            ${widgets}search-box--main
    Wait Until Element Is Enabled    css:input[type='text']
    Input Text                       css:input[type='text']                     B
    Wait Until Element Is Visible    //*[contains(.,'B second suggestion')]

unable to submit a search
    Go To                               ${widgets}search-box--disabled
    Wait Until Page Contains Element    css:input[type='text']
    Element Should Be Disabled          css:input[type='text']
