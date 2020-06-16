*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook   ${STORYBOOK_URL}/iframe.html?id=components-notification-banner--banner-controller
Test Setup        Run Keywords
...               Reload Page                 AND
...               Wait Until Page Contains    success    7s
Suite Teardown    Close Browser
Force Tags        smoke


*** Variables ***
${closeIconButton}    css:[role=button][class*=closeAction]
${banner}             banner2-content
${messageActions}     banner2-content-message-actions    #button actions
${messageText}        banner2-content-message-text


*** Test Cases ***
banner structure with svg text and action
    Click Button                     success
    Wait Until Element Is Visible    ${banner}            2s
    Element Text Should Be           ${messageText}       This is a success banner.
    Element Should Be Visible        ${messageActions}

banner close it
    Click Button                         success
    Wait Until Element Is Visible        ${banner}             2s
    Click Element                        ${closeIconButton}
    Wait Until Element Is Not Visible    ${banner}             2s
