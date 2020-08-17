*** Setting ***
Resource      ../_keywords.resource
Variables     variables.yaml
Test Setup    Run Keywords
...           Go To    ${components}modal--text-and-semantic
...           AND    Wait Until Element Is Enabled    ${buttonWarning}
Force Tags    keyboard
Force Tags    v3

*** Test Cases ***
navigate to next component element when TAB is pressed
    Click Button                     Warning
    Wait Until Element Is Visible    ${dialog}
    Press Keys                       None                    TAB
    Element Should Be Focused        ${buttonApply}
    Press Keys                       None                    TAB
    Element Should Be Focused        ${buttonCancel}
    Press Keys                       None                    TAB
    Element Should Be Focused        ${dialogCloseButton}

close modal when ESCAPE is pressed
    Click Button                                Warning
    Wait Until Element Is Visible               ${dialog}
    Press Keys                                  None         ESCAPE
    Wait Until Page Does Not Contain Element    ${dialog}
