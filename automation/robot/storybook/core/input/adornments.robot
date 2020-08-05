*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${components}input--limited
...           AND    Wait Until Element Is Enabled    ${input}
Force Tags        v3


*** Test Cases ***
show accepted adornment when inserted valid input and and focus goes out
    Input Text                       ${input}    Joao
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

show error adornment when inserted invalid input and and focus goes out
    Input Text                       ${input}   Booom!
    Press Keys                       NONE       TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

does not show validation adornment icons when user is still typing
    Press Keys                       ${input}   Joao
    Element Should Not Be Visible    ${adornment_accepted}
    Press Keys                       ${input}   Booom!
    Element Should Not Be Visible    ${adornment_failed}

does not show validation adornment icons when input was clean
    Input Text                           ${input}    Joao
    Press Keys                           NONE    TAB
    wait until element is Visible        ${adornment_accepted}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE    TAB
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited
    [Documentation]    unexpected behavior just when firefox run via webdriver
    Input Text                           ${input}    Jo
    Press Keys                           NONE    TAB
    wait until element is Visible        ${adornment_accepted}
    Press Keys                           ${input}    ao
    wait until element is Not Visible    ${adornment_accepted}

does not show previous adornment when input is being edited by clicking in label
    Input Text                       ${input}    Joao
    Click Element                    ${label}
    Wait Until Element Is Visible    ${input}:focus
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - failed to accepted
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}   Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate input when focus goes out - failed to failed
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}    123456    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - accepted to failed
    Press Keys                       ${input}    Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Press Keys                       ${input}    Booom!    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

show adornment and clean button when mouse hover unfocused filled input
    [Tags]    bug-ie
    [Documentation]    https://github.com/lumada-design/hv-uikit-react/issues/1749
    ...                Integration: clean button, adornments
    Press Keys                       ${input}    Joao    TAB
    Mouse Over                       ${input}
    Wait Until Element Is Visible    ${clean_button}
    Wait Until Element Is Visible    ${adornment_accepted}


*** Variables ***
${adornment_accepted}    css:div [class*=IconSuccess]
${adornment_failed}      css:div [class*=IconFail]
${clean_button}          css:button [class*=IconClose]
${input}                 css:#limited-input-input
${label}                 css:#limited-input-label
