*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
banner structure with svg, text and action
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebanner--banner6
    Wait Until Element Is Visible    banner6-open-button                                    7s
    Click Button                     banner6-open-button
    Wait Until Element Is Visible    banner6-content                                        2s
    Element Text Should Be           banner6-content-message-text                           This is a success banner.
    Page Should Contain Element      //div[contains(@class,'Success')]/*[name()='svg']
    Element Should Be Visible        //div[@id='banner6-content-message-actions']/button    # Action Button

banner close it
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corebanner--banner6
    Wait Until Element Is Visible        banner6-open-button                                    7s
    Click Button                         banner6-open-button
    Wait Until Element Is Visible        banner6-content                                        2s
    Click Element                        css:div[role='button']
    Wait Until Element Is Not Visible    banner6-content                                        2s
