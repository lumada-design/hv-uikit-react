*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    issue
Documentation
...    TC fails just when executed via jenkins, otherwise run test manually or via locally they always pass. (This problems are being mitigate)

*** Test Cases ***
successful requests after input credencials
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corelogin--login1
    Wait Until Element Is Enabled    css:input                          15s
    Input Text                       css:input[name='username']         user
    Input Text                       css:input[type='password']         pass
    Click Button                     Log in
    Page Should Contain Element      //button[contains(.,'Logging')]

successful requests after press ENTER
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corelogin--login1
    Wait Until Element Is Enabled       css:input                          15s
    Input Text                          css:input[name='username']         user
    Input Text                          css:input[type='password']         pas
    Press Keys                          css:input[type='password']         RETURN    #same as ENTER key
    Wait Until Page Contains Element    //button[contains(.,'Logging')]    2s

unsuccessful requests after input credencials
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corelogin--login2
    Wait Until Element Is Enabled    css:input      15s
    Click Button                     Log button
    Element Should Be Visible        css:div[class|='loginForm-errorMessageContainer']
    Page Should Contain              Some Error!

remember me checkbox is clickable by label
    Go To                              ${STORYBOOK_URL}/iframe.html?id=corelogin--login4
    Wait Until Element Is Enabled      css:input[type='checkbox']                15s
    Checkbox Should Not Be Selected    css:input[type='checkbox']
    Click Element                      //label[contains(@class,'HvCheckbox')]
    Checkbox Should Be Selected        css:input[type='checkbox']
    Click Element                      css:input[type='checkbox']
    Checkbox Should Not Be Selected    css:input[type='checkbox']

redirect to recovery form
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corelogin--login5
    Wait Until Element Is Enabled    css:button                         15s
    Click Button                     Forgot your credentials?
    Page Should Contain              Recover Credentials
    Page Should Contain Element      //button[contains(.,'Cancel')]
    Page Should Contain Element      //button[contains(.,'Recover')]

sucess message on recorery
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corelogin--login5
    Wait Until Element Is Enabled       css:button                         15s
    Click Button                        Forgot your credentials?
    Click Button                        //button[contains(.,'Recover')]
    Wait Until Page Contains Element    css:div[class|='recoveryForm-messageContainer']    2s
    Wait Until Page Contains            The instructions to recover your credentials were sent.    2s

cancel recovery form
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corelogin--login5
    Wait Until Element Is Enabled       css:button                         15s
    Click Button                        Forgot your credentials?
    Click Button                        //button[contains(.,'Recover')]
    Wait Until Page Contains Element    //button[contains(.,'Cancel')]     2s
    Click Element                       //button[contains(.,'Cancel')]
    Page Should Contain                 Welcome
    Page Should Contain                 Forgot your credentials?
