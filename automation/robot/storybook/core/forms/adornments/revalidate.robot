*** Setting ***
Resource      _resource.resource
Test Setup    Run Keywords
...           Go To    ${components}forms-formelement--form-element-state-transition
...           AND    Wait Until Element Is Enabled    ${input}    10s


*** Test Cases ***
does not show validation adornment icons when input is cleaned
    Input Text                           ${input}    Joao
    Press Keys                           NONE    TAB
    wait until element is Visible        ${adornment_accepted}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE    TAB
    wait until element is Not Visible    ${adornment_accepted}

does not show previous validation when input is being edited
    [Documentation]    unexpected behavior just when firefox run via webdriver
    [Tags]    bug-firefox-webdriver
    Input Text                           ${input}    Joao
    Press Keys                           NONE    TAB
    wait until element is Visible        ${adornment_accepted}
    Press Keys                           ${input}   \ Goncalves
    wait until element is Not Visible    ${adornment_accepted}

revalidate input when adornment button is clicked - failed to accepted
    [Documentation]    unexpected behavior just when firefox run via webdriver
    [Tags]    bug-firefox-webdriver
    Input Text                       ${input}    a1b2
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE    Joao    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate input when adornment button is clicked - accepted to accepted
    Input Text                       ${input}    Joao
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE    Goncalves    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

revalidate input when focus goes out - failed to failed
    Input Text                       ${input}    a1
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE    1a    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

revalidate input when focus goes out - accepted to failed
    [Documentation]    unexpected behavior just when firefox run via webdriver
    [Tags]    bug-firefox-webdriver
    Input Text                       ${input}    Joao
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Double Click Element             ${input}
    Press Keys                       NONE    DELETE    1a    TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}