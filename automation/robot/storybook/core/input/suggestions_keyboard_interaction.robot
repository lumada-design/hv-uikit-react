*** Setting ***
Resource         _input.resource
Test Setup       open input sample    ${components}    suggestion
Force Tags       keyboard    bug-ie
Documentation    https://github.com/lumada-design/hv-uikit-react/issues/1750


*** Test Cases ***
focus first suggestion option when input is focused and is pressed TAB
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    po
    Wait Until Element Is Visible    ${suggestion_list}
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus

close suggestions list when focus is on list and is pressed TAB
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    TAB
    Wait Until Element Is Visible        ${suggestion_options}:first-child:focus
    Press Keys                           NONE    TAB
    Wait Until Element Is Not Visible    ${suggestion_list}

return focus to input when is pressed SHIFT TAB
    Wait Until Element Is Visible    ${input}
    Press Keys                       ${input}    po
    Wait Until Element Is Visible    ${suggestion_list}
    Press Keys                       NONE    TAB
    Wait Until Element Is Visible    ${suggestion_options}:first-child:focus
    Press Keys                       NONE    SHIFT+TAB
    Wait Until Element Is Visible    ${input}:focus

select an option list when is pressed SPACE
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    por
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           NONE    TAB    SPACE
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal
    Wait Until Element Is Visible        ${input}:focus

select an option list when is pressed ENTER
    Wait Until Element Is Visible    ${input}
    Press Keys                           ${input}    po
    Wait Until Element Is Visible        ${suggestion_list}
    Press Keys                           ${suggestion_Portugal}    ENTER
    Wait Until Element Is Not Visible    ${suggestion_list}
    Textfield Value Should Be            ${input}    Portugal
    Wait Until Element Is Visible        ${input}:focus

focus options suggestions when pressed UP or DOWM
    Wait Until Element Is Visible    ${input}
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
${suggestion_list}       css:ul[role=listbox]
${suggestion_options}    css:ul[role=listbox]>li
${suggestion_Portugal}   xpath://li[.='Portugal']
