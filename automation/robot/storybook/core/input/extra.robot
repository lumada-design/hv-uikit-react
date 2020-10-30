*** Setting ***
Resource      _input.resource
Test Setup    open input sample    ${forms}    password


*** Test Cases ***
helper text - change value when input is edited
    Element Text Should Be           ${helperText}    ${empty}
    Press Keys                       ${input}    boom    TAB
    Element Text Should Be           ${helperText}    Your password has less than 6 characters

label - focus input when label is pressed
    Click Element                ${label}
    Element Should Be Focused    ${input}

placeholder - show placeholder when input rendered
    Element Attribute Value Should Be    ${input}    placeholder    Must have at least 6 character


*** Variables ***
${label}     css:label
