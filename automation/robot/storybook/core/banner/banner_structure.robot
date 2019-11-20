*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke

*** Test Cases ***
banner structure with svg, text and action
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebanner--banner6
    Wait Until Element Is Visible    css:button              7s
    Click Button                     Click Me
    Wait Until Element Is Visible    client-snackbar         2s
    Element Text Should Be           client-snackbar         This is default\nAction
    Page Should Contain Element      //div[contains(@class,'Success')]/*[name()='svg']
    Element Should Be Visible        //a[text()='Action']    # Action Link

banner close it
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corebanner--banner6
    Wait Until Element Is Visible        css:button                7s
    Click Button                         Click Me
    Wait Until Element Is Visible        client-snackbar           2s
    Click Element                        css:div[role='button']
    Wait Until Element Is Not Visible    client-snackbar           2s
