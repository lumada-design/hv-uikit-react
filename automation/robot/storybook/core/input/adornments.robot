*** Setting ***
Resource        _input.resource
Test Setup      Go To                ${tests}input--limited
Documentation
...    opened firefox webdriver error https://github.com/mozilla/geckodriver/issues/1742
...    - as work around was used locator of label that redirects to input


*** Test Cases ***
show accepted adornment when inserted valid input and and focus goes out
    Wait Until Element Is Visible    ${input}
    Input Text                       ${input}    Joao
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

show error adornment when inserted invalid input and and focus goes out
    Wait Until Element Is Visible    ${input}
    Input Text                       ${input}   Booom!
    Press Keys                       NONE       TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

does not show validation adornment icons when user is still typing
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}   Joao
    Element Should Not Be Visible    ${adornment_accepted}
    Press Keys                       ${input}   Booom!
    Element Should Not Be Visible    ${adornment_failed}

does not show validation adornment icons when input was clean
    Wait Until Element Is Visible    ${input}
    Input Text                           ${input}    Joao
    Press Keys                           NONE    TAB
    wait until element is Visible        ${adornment_accepted}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE    TAB
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}   Jo    TAB
    wait until element is Visible        ${adornment_accepted}
    Click Element                        ${label}
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited by clicking in label
    Wait Until Element Is Visible    ${input}
    Input Text                       ${input}    Joao
    Click Element                    ${label}
    Wait Until Element Is Visible    ${input}:focus
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - failed to accepted
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}   Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate input when focus goes out - failed to failed
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}    123456    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - accepted to failed
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

show adornment and clean button when mouse hover unfocused filled input
    [Tags]    bug-ie-webdriver
    [Documentation]
    ...  https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#hovering-over-elements
    ...  firefox-webdriver focus blur issue work around, send "TAB" instead "mouse click"
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Joao    TAB
    Mouse Over                       ${input}
    Wait Until Element Is Visible    ${clean_button}
    Wait Until Element Is Visible    ${adornment_accepted}
