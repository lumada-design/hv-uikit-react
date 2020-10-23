*** Setting ***
Resource      ../_keywords.resource
Test Setup    Run Keywords
...           Go To    ${components}banner--banner-controller
...           AND    Wait Until Page Contains    success


*** Test Cases ***
banner structure with svg text and action
    Click Button                     success
    Wait Until Element Is Visible    ${banner}
    Element Text Should Be           ${messageText}       This is a success banner.
    Element Should Be Visible        ${messageActions}

banner close it
    Click Button                         success
    Wait Until Element Is Visible        ${banner}
    Click Element                        ${closeIconButton}
    Wait Until Element Is Not Visible    ${banner}


*** Variables ***
${banner}             banner2-content
${closeIconButton}    css:[class*=closeAction]
${messageActions}     banner2-content-message-actions
${messageText}        banner2-content-message-text
