*** Setting ***
Resource      _adornments.resource
Test Setup    open adornment sample    ${guides}    main


*** Test Cases ***
show accepted adornment when inserted valid input and and focus goes out
    Input Text                       ${input}    Joao
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${adornment_accepted}
    Element Should Not Be Visible    ${adornment_failed}

show error adornment when inserted invalid input and and focus goes out
    Input Text                       ${input}    1234
    Press Keys                       NONE       TAB
    Wait Until Element Is Visible    ${adornment_failed}
    Element Should Not Be Visible    ${adornment_accepted}

does not show validation adornment icons when user is still typing
    Press Keys                       ${input}   Joao \
    Element Should Not Be Visible    ${adornment_accepted}
    Press Keys                       ${input}   123
    Element Should Not Be Visible    ${adornment_failed}

focus input when label is pressed
    Click Element                      ${label}
    Wait Until Element Is Visible      ${input}:focus
