*** Setting ***
Resource      _input.resource
Test Setup    open input sample    ${inputs}    password


*** Test Cases ***
helper text - change value when input is edited
    Wait Until Element Is Visible    ${input}
    Element Text Should Be           ${helperText}    ${empty}
    Press Keys                       ${input}    boom    TAB
    Element Text Should Be           ${helperText}    Your password has less than 6 characters

label - focus input when label is pressed
    Wait Until Element Is Visible    ${input}
    Click Element                ${label}
    Element Should Be Focused    ${input}

placeholder - show placeholder when input rendered
    Wait Until Element Is Visible    ${input}
    Element Attribute Value Should Be    ${input}    placeholder    Must have at least 6 character


*** Variables ***
${label}     css:label
