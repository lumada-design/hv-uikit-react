*** Setting ***
Resource       ../_keywords.resource
Suite Setup    Run Keywords
...            Go To    ${patterns}user-preferences--two-buttons
...            AND               Wait Until Element Is Visible    ${userPreferences}
Force Tags     keyboard    bug-infrastructure-ie


*** Test Cases ***
focus first item when is loaded
    Element Should Be Focused    ${action1}

move focus to next list item when TAB is pressed
    Press Keys                   ${action1}    TAB
    Element Should Be Focused    ${option1}
    Press Keys                   ${option2}    TAB
    Element Should Be Focused    ${option3}

move focus to previous list item when SHIFT TAB is pressed
    Press Keys                   ${option3}    SHIFT+TAB
    Element Should Be Focused    ${option2}
    Press Keys                   ${option2}    SHIFT+TAB
    Element Should Be Focused    ${option1}

move focus to next page element when TAB is pressed on last list item
    Press Keys                   ${option4}     TAB
    Element Should Be Focused    ${buttonBottom}

move focus to previous page element when SHIFT TAB is pressed on last list item
    Click Element                ${option1}
    Press Keys                   NONE    SHIFT+TAB    SHIFT+TAB
    Element Should Be Focused    ${buttonTop}


*** Variables ***
${action1}            id:action1
${option1}            id:option1
${option2}            id:option2
${option3}            id:option3
${option4}            id:option4
${userPreferences}    id:user-preferences
${buttonBottom}       id:buttonBottom
${buttonTop}          id:buttonTop
