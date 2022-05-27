*** Setting ***
Resource      _input.resource
Test Setup    open input sample    ${components}    main
Documentation
...           complementary tests on:
...           Suite: ...\automation\robot\storybook\core\input\adornments.robot
...           Test Case: show adornment and clean button when mouse hover unfocused filled input


*** Test Cases ***
clean input when it is focused and clean button is pressed
    [Documentation]    show clean button when input is not empty and is focused
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Joao
    wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Page Should Not Contain          Joao

clean input when it is not focused and clean button is pressed
    [Tags]    bug-ie
    [Documentation]    https://github.com/lumada-design/hv-uikit-react/issues/1749
    ...                show clean button when input is not empty and mouse is hover it
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    Joao    TAB
    Mouse Over                       ${input}
    wait Until Element Is Visible    ${clean_button}
    Click Element                    ${clean_button}
    Page Should Not Contain          Joao

show clean button when input is not empty and is focused and mouse is hover it
    Wait Until Element Is Visible    ${input}
    Input Text                           ${input}    Joao
    Double Click Element                 ${description}
    Wait Until Element Is Not Visible    ${clean_button}
    Double Click Element                 ${input}
    wait until Element Is Visible        ${clean_button}

does not show clean button when input is not focused and mouse is not hover it
    Wait Until Element Is Visible    ${input}
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Press Keys                           NONE    TAB
    Mouse Over                           ${description}
    Wait Until Element Is Not Visible    ${clean_button}

does not show clean button when input is empty and is focused and mouse is hover it
    Wait Until Element Is Visible    ${input}
    Double Click Element             ${input}
    Element Should Not Be Visible    ${clean_button}

does not show clean button when it is clicked
    Wait Until Element Is Visible    ${input}
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Double Click Element                 ${clean_button}
    Wait Until Element Is Not Visible    ${clean_button}

does not show clean button when input is cleaned
    Wait Until Element Is Visible    ${input}
    Input Text                           ${input}    Joao
    Wait Until Element Is Visible        ${clean_button}
    Double Click Element                 ${input}
    Press Keys                           NONE    DELETE
    Wait Until Element Is Not Visible    ${clean_button}
