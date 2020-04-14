*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Variables         variables.yaml
Suite Setup       open storybook
Test Setup        go to url and wait until element is visible    ${STORYBOOK_URL}/${login1}    ${button_login}    15s
Suite Teardown    Close Browser
Force Tags        smoke            keyboard


*** Keywords ***
submit credentials pressing ENTER
    [Arguments]    ${locator}
    Set Focus To Element           ${locator}
    Element Should Be Focused      ${locator}
    Press Keys                     None          ENTER
    Wait Until Page Contains       Logging       3s
    Wait Until Keyword Succeeds    3             300ms    Element Should Be Disabled    ${button_login}


*** Test Cases ***
ENTER: submit credentials when focus is on input username and is pressed ENTER
    submit credentials pressing ENTER    ${input_username}

ENTER: submit credentials when focus is on input password and is pressed ENTER
    submit credentials pressing ENTER    ${input_password}
    
ENTER: submit credentials when focus is on checkbox remenber me and is pressed ENTER
    submit credentials pressing ENTER    ${checkbox_remember}

ENTER: submit credentials when focus is on Log in Button and is pressed ENTER
    submit credentials pressing ENTER    ${button_login}
    
ENTER: show recovery form when focus is on Forgot your credentials button and is pressed ENTER
    Set Focus To Element         ${button_forgot}
    Element Should Be Focused    ${button_forgot}
    Press Keys                   None                   ENTER
    Wait Until Page Contains     Recover Credentials    3s

SPACE: check and uncheck remember me checkbox when focus is on checkbox and is pressed SPACE
    Set Focus To Element               ${checkbox_remember}
    Element Should Be Focused          ${checkbox_remember}
    Press Keys                         None                    SPACE
    Checkbox Should Be Selected        ${checkbox_remember}
    Press Keys                         None                    SPACE
    Checkbox Should Not Be Selected    ${checkbox_remember}
       
TAB: move focus to next element correctly when tab is pressed on welcome form
    Set Focus To Element         ${input_username}
    Press Keys                   None                    TAB
    Element Should Be Focused    ${input_password}
    Press Keys                   None                    TAB
    Element Should Be Focused    ${checkbox_remember}
    Press Keys                   None                    TAB
    Element Should Be Focused    ${button_login}
    Press Keys                   None                    TAB
    Element Should Be Focused    ${button_forgot}
