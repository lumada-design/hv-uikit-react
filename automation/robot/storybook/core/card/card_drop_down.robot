*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
click on button Add on card
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-card--automatic-actions
    Wait Until Element Is Enabled    css:button                10s
    Click Button                     Add
    Alert Should Be Present          You have pressed Add

click on button ... Delete on 9. Automatic action creation from list
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-card--automatic-actions
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']      10s
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']       2s
    Click Element                    //p[text()='Delete']
    Alert Should Be Present          You have pressed Delete

unable click on preview and upload button
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-card--automatic-actions
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']    10s
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']     2s
    Element Should Be Visible        //li[contains(@class,'List-disabled') and contains(.,'Preview')]
    Element Should Be Visible        //li[contains(@class,'List-disabled') and contains(.,'Upload')]
    Element Should Be Visible        //li[not(contains(@class,'List-disabled')) and contains(.,'Delete')]
