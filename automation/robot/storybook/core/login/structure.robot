*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Force Tags    bug-infrastructure-ie


*** Test Cases ***
disable button and change label to logging when log in button is pressed on sample login1
    Go To                            ${components}login--successful
    Wait Until Element Is Enabled    ${button_login}
    Page Should Not Contain          Logging
    Click Button                     Log in
    Wait Until Page Contains         Logging
    Element Should Be Disabled       ${button_login}

show errors and keep elements enable when log button is pressed on sample login2
    Go To                            ${components}login--unsuccessful
    Wait Until Element Is Enabled    ${input_username}
    Page Should Not Contain          Error!
    Click Button                     Login
    Wait Until Page Contains         Error!

check and uncheck remember me checkbox when her label is clicked
    Go To                              ${components}login--successful
    Wait Until Element Is Enabled      ${checkbox_remember}
    Checkbox Should Not Be Selected    ${checkbox_remember}
    Click Element                      ${label_remember}
    Checkbox Should Be Selected        ${checkbox_remember}
    Click Element                      ${label_remember}
    Checkbox Should Not Be Selected    ${checkbox_remember}

show recovery form when Forgot your credentials button is pressed
    Go To                            ${components}login--custom-background
    Wait Until Element Is Enabled    ${input_username}
    Page Should Not Contain          Recover Credentials
    Click Button                     Forgot your credentials?
    Wait Until Page Contains         Recover Credentials

show sent message and return to welcome login form when recovery button is pressed
    Go To                               ${components}login--custom-background
    Wait Until Element Is Enabled       ${input_username}
    Click Button                        Forgot your credentials?
    Wait Until Page Contains            Recover Credentials
    Click Button                        Recover
    Wait Until Page Contains            instructions to recover your credentials were sent.
    Wait Until Page Does Not Contain    Recover Credentials
    Page Should Contain                 Forgot your credentials?

return to welcome login form when cancel button is pressed on recovery form
    Go To                               ${components}login--custom-background
    Wait Until Element Is Enabled       ${input_username}
    Click Button                        Forgot your credentials?
    Wait Until Page Contains            Recover Credentials
    Click Button                        Cancel
    Wait Until Page Does Not Contain    Recover Credentials
    Page Should Contain                 Forgot your credentials?
