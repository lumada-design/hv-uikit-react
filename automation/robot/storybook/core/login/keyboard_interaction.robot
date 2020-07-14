*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Test Setup    Run Keywords
...           Go To    ${patterns}login--successful
...           AND    Wait Until Element Is Visible    ${button_login}
Force Tags    keyboard    bug-infrastructure-ie


*** Keywords ***
submit credentials pressing ENTER
    [Arguments]    ${locator}
    Set Focus To Element           ${locator}
    Element Should Be Focused      ${locator}
    Press Keys                     None          ENTER
    Wait Until Page Contains       Logging
    Wait Until Keyword Succeeds    3             300ms
    ...    Element Should Be Disabled    ${button_login}


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
    Wait Until Page Contains     Recover Credentials

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
