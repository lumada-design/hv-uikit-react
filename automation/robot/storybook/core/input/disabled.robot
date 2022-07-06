*** Setting ***
Resource       _input.resource
Suite Setup    Run Keywords
...            Go To    ${inputs}input--disabled
...            AND    Wait Until Element Is Visible    ${input}


*** Test Cases ***
input is disabled when it is rendered
    Wait Until Element Is Visible    ${input}
    Element Should Be Disabled    ${input}

does not focus input when click on disabled label
    Wait Until Element Is Visible    ${input}
    Click Element                 ${label}
    Element Should Be Disabled    ${input}


*** Variables ***
${input}    css:#input-disabled-sample-input
${label}    css:#input-disabled-sample-label
