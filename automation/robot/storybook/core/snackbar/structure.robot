*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
snackbar 2 with custom icon close after 6 seconds
    [setup]    Go To    ${components}feedback-snackbar--custom-icon
    Wait Until Element Is Visible    snackbar2
    Wait Until Page Contains         This is a snackbar with a custom icon.

snackbar 4 With actions renders an action
    [setup]    Go To    ${components}feedback-snackbar--custom-action
    Wait Until Element Is Visible    actionStructure
    Wait Until Page Contains         This is a snackbar
