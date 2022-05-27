*** Setting ***
Resource      _adornments.resource
Test Setup    open adornment sample    ${howto}    main


*** Test Cases ***
show clean button when input is not empty and is focused
    Press Keys                       ${input}    Joao
    Mouse Over                       ${label}
    wait Until Element Is Visible    ${clean_button}

show clean button when input is not empty and mouse is hover it
    [Tags]    bug-ie-webdriver
    [Documentation]
    ...  https://github.com/SeleniumHQ/selenium/wiki/InternetExplorerDriver#hovering-over-elements
    ...  firefox-webdriver focus blur issue work around, send "TAB" instead "mouse click"
    Input Text                           ${input}    Joao
    Press Keys                           NONE    TAB
    Wait Until Element Is Not Visible    ${clean_button}
    mouse Over                           ${input}
    wait until Element Is Visible        ${clean_button}

show clean button when input is not empty and is focused and mouse is hover it
    Press Keys                           ${input}    Joao    TAB
    Mouse Over                           ${label}
    Wait Until Element Is Not Visible    ${clean_button}
    Double Click Element                 ${input}
    wait until Element Is Visible        ${clean_button}

does not show clean button when input is not focused and mouse is not hover it
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Press Keys                           NONE    TAB
    Mouse Over                           ${label}
    Wait Until Element Is Not Visible    ${clean_button}

does not show clean button when input is empty and is focused and mouse is hover it
    Double Click Element             ${input}
    Element Should Not Be Visible    ${clean_button}

does not show clean button when it is clicked
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Double Click Element                 ${clean_button}
    Wait Until Element Is Not Visible    ${clean_button}

does not show clean button when input is cleaned
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE
    Wait Until Element Is Not Visible    ${clean_button}
