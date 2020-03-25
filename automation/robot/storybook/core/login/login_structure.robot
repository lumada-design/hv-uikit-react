*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         variables.yaml
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    bug-infrastructure-ie

*** Test Cases ***
disable button and change label to logging when log in button is pressed on sample login1
    Go To                            ${STORYBOOK_URL}/${login1}
    Wait Until Element Is Enabled    ${button_login}    15s
    Page Should Not Contain          Logging
    Click Button                     Log in
    Wait Until Page Contains         Logging            3s
    Element Should Be Disabled       ${button_login}

show errors and keep elements enable when log button is pressed on sample login2
    Go To                            ${STORYBOOK_URL}/${login2}
    Wait Until Element Is Enabled    ${input_username}    15s
    Page Should Not Contain          Some Error!
    Click Button                     Log button
    Wait Until Page Contains         Some Error!          3s
    Element Should Be Enabled        ${button_login}
    
check and uncheck remember me checkbox when her label is clicked
    Go To                              ${STORYBOOK_URL}/${login1}
    Wait Until Element Is Enabled      ${checkbox_remenber}    15s
    Checkbox Should Not Be Selected    ${checkbox_remenber}
    Click Element                      ${label_remenber}
    Checkbox Should Be Selected        ${checkbox_remenber}
    Click Element                      ${label_remenber}
    Checkbox Should Not Be Selected    ${checkbox_remenber}
    
show recovery form when Forgot your credentials button is pressed
    Go To                            ${STORYBOOK_URL}/${login5}
    Wait Until Element Is Enabled    ${input_username}           15s
    Page Should Not Contain          Recover Credentials
    Click Button                     Forgot your credentials?
    Wait Until Page Contains         Recover Credentials         3s

show sent message and return to welcome login form when recovery button is pressed on recovery form
    Go To                               ${STORYBOOK_URL}/${login5}
    Wait Until Element Is Enabled       ${input_username}           15s
    Click Button                        Forgot your credentials?
    Wait Until Page Contains            Recover Credentials         3s
    Click Button                        Recover
    Wait Until Page Contains            The instructions to recover your credentials were sent.    3s
    Wait Until Page Does Not Contain    Recover Credentials         3s
    Page Should Contain                 Forgot your credentials?
    
return to welcome login form when cancel button is pressed on recovery form
    Go To                               ${STORYBOOK_URL}/${login5}
    Wait Until Element Is Enabled       ${input_username}           15s
    Click Button                        Forgot your credentials?
    Wait Until Page Contains            Recover Credentials         3s
    Click Button                        Cancel
    Wait Until Page Does Not Contain    Recover Credentials         3s
    Page Should Contain                 Forgot your credentials?
