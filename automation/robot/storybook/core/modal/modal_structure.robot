*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Test Setup    Run Keywords
...           Go To    ${components}modal--text-and-semantic
...           AND    Wait Until Element Is Enabled    ${buttonWarning}
Force Tags    keyboard


*** Test Cases ***
focus first element (close button) when modal is opened
    Click Button                                ${buttonWarning}
    Wait Until Element Is Visible               ${dialog}
    Element Should Be Focused                   ${dialogCloseButton}
    Wait Until Page Does Not Contain Element    ${buttonApply}:focus

close modal when dialog close button is pressed
    Click Button                                ${buttonWarning}
    Wait Until Element Is Visible               ${dialog}
    Click Button                                ${dialogCloseButton}
    Wait Until Page Does Not Contain Element    ${dialog}
