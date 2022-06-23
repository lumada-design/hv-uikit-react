*** Setting ***
Resource      _dialog.resource
Test Setup    open modal sample    ${overlay}    text-and-semantic
Force Tags    keyboard


*** Test Cases ***
navigate to next component element when TAB is pressed
    Click Button                     Warning
    Wait Until Element Is Visible    ${dialog}
    Press Keys                       None    TAB
    Element Should Be Focused        ${buttonApply}
    Press Keys                       None    TAB
    Element Should Be Focused        ${buttonCancel}
    Press Keys                       None    TAB
    Element Should Be Focused        ${dialogCloseButton}

close modal when ESCAPE is pressed
    Click Button                                Warning
    Wait Until Element Is Visible               ${dialog}
    Press Keys                                  None     ESCAPE
    Wait Until Page Does Not Contain Element    ${dialog}
