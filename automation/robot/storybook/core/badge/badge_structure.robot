*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    

*** Test Cases ***
badge maxCount is 99
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebadge--badgewithicon
    Wait Until Element Is Visible    //div[contains(@class,'Badge-showCount') and contains(.,'99+')]      10s
    
all badges renders an icon
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebadge--badgewithicon
    Wait Until Element Is Visible    //*[local-name() = 'svg']    7s
    verify element count             //*[local-name() = 'svg']    5
    
all badges renders a text
    go to                       ${STORYBOOK_URL}/iframe.html?id=corebadge--badgewithtext
    Wait Until Page Contains    Events                    10s
    verify element count        //*[text() = 'Events']    5