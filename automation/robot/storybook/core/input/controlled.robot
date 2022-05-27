*** Setting ***
Resource      _input.resource
Test Setup    open input sample    ${components}    controlled-with-buttons


*** Test Cases ***
input value change when related button are pressed
    Wait Until Element Is Visible    ${input}
    Textfield Value Should Be    ${input}    Initial value
    click Button                 First value
    Textfield Value Should Be    ${input}    First value
    click Button                 Second value
    Textfield Value Should Be    ${input}    Second value
    click Button                 Third value
    Textfield Value Should Be    ${input}    Third value

clean input when pressed button clear value
    Wait Until Element Is Visible    ${input}
    Textfield Value Should Be    ${input}    Initial value
    click Button                 Clear value
    Textfield Value Should Be    ${input}    ${empty}

block chars insertion when input already has max 25 chars
    [Setup]     Go To                ${components}inputs-input--custom-props
    Wait Until Element Is Visible    ${input}
    Wait Until Element Is Visible    ${input}
    Input Text                       ${input}    123456789012345678901234567890
    Textfield Value Should Be        ${input}    1234567890123456789012345
