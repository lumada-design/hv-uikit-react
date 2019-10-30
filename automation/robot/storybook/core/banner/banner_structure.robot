*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke

*** Test Cases ***
banner structure with svg, text and action
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebanner--banner5
    Wait Until Element Is Visible    //button           10s
    Click Button                     Click Me
    Wait Until Element Is Visible    client-snackbar    2s
    Element Text Should Be           client-snackbar    This is default\nAction
    Page Should Contain Element      //div[contains(@class,'Success')]/*[name()='svg']   
    Element Should Be Visible        //a[@href='https://i.imgflip.com/yrj3h.jpg' and text()='Action']    # Action Link

banner close it
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corebanner--banner5
    Wait Until Element Is Visible        //button                 10s
    Click Button                         Click Me
    Wait Until Element Is Visible        client-snackbar          2s
    Click Element                        //div[@role='button']
    Wait Until Element Is Not Visible    client-snackbar          3s
