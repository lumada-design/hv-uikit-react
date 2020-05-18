*** Setting ***
Library           SeleniumLibrary
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       open storybook   ${STORYBOOK_URL}/iframe.html?id=corebanner--banner6
Test Setup        Run Keywords
...               Reload Page                 AND
...               Wait Until Page Contains    Click me    7s
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
banner structure with svg, text and action
    open banner
    Element Text Should Be       ${messageText}    This is a success banner.
    Element Should Be Visible    ${messageActions}

banner close it
    open banner
    close banner


*** Keywords ***
open banner
    Click Button                     Click me
    Wait Until Element Is Visible    ${banner}    2s

close banner
   Wait Until Keyword Succeeds    3x    750ms
   ...    close

close
    Click Element                        ${closeIconButton}
    Wait Until Element Is Not Visible    ${banner}    2s


*** Variables ***
${closeIconButton}    css:[role=button][class*=closeAction]
${banner}             id:banner6-content
${messageActions}     id:banner6-content-message-actions    #button actions
${messageText}        id:banner6-content-message-text
