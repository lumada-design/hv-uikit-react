*** Setting ***
Resource         ../_keywords.resource
Test Setup       Run Keywords
...              Go To    ${components}input--suggestion
...              AND    Wait Until Element Is Enabled    ${input}
Force Tags       keyboard    bug-ie
Documentation    https://github.com/lumada-design/hv-uikit-react/issues/1750
Force Tags        v3

*** Test Cases ***
focus first suggestion option when input is focused and is pressed TAB
    Press Keys                       ${input}    po
    Wait Until Element Is Visible    ${suggestion_list}
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus

close suggestions list when focus is on list and is pressed TAB
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    TAB
    Wait Until Element Is Visible        ${suggestion_options}:first-child:focus
    Press Keys                           NONE    TAB
    Wait Until Element Is Not Visible    ${suggestion_list}

return focus to input when is pressed SHIFT TAB
    Press Keys                       ${input}    po
    Wait Until Element Is Visible    ${suggestion_list}
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus
    Press Keys                       NONE    SHIFT+TAB
    Wait Until Element Is Visible    ${input}:focus

select an option list when is pressed SPACE
    Press Keys                           ${input}    por
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    TAB    SPACE
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal
    Wait Until Element Is Visible        ${input}:focus

select an option list when is pressed ENTER
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           ${suggestion_Portugal}    ENTER
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal
    Wait Until Element Is Visible        ${input}:focus

focus options suggestions when pressed UP or DOWM
    Press Keys                       ${input}    J
    Wait Until Element Is Visible    ${suggestion_list}
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus
    Press Keys                       NONE    ARROW_DOWN    ARROW_DOWN   ARROW_DOWN
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus
    Press Keys                       NONE    ARROW_UP
    Wait Until Element Is Visible    ${suggestion_options}:last-child:focus


*** Variables ***
${input}                 css:input[type=text]
${label}                 css:#suggestions-label
${suggestion_list}       css:ul[role=menu]
${suggestion_options}    css:ul[role=menu]>li
${suggestion_Portugal}   xpath://li[.='Portugal']
