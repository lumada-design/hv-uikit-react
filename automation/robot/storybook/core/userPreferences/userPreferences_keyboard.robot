*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       Run Keywords
...               open storybook    ${STORYBOOK_URL}/iframe.html?id=core-userpreferences--integrated
...               AND               Wait Until Element Is Visible    ${userPreferences}    10s
Suite Teardown    Close Browser
Force Tags        smoke    keyboard


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
