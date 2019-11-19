*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke              

*** Test Cases ***
snackbar 2. with custom icon close after 6 seconds
    go to                            ${STORYBOOK_URL}/iframe.html?id=coresnackbar--snackbar2
    Wait Until Element Is Visible    //button           10s
    Click Button                     Click me
    Wait Until Page Contains         This is a custom icon    2s
    Element Should Be Visible        client-snackbar
    Sleep                            6s
    Element Should Not Be Visible    client-snackbar

snackbar 4. With actions renders an action
    go to                            ${STORYBOOK_URL}/iframe.html?id=coresnackbar--snackbar4
    Wait Until Element Is Visible    //button           10s
    Click Button                     Click Me
    Wait Until Page Contains         This is a snackbar
    Element Should Be Visible        client-snackbar
    Element Should Be Visible        //a[text()='Action']
    Sleep                            6s
    Element Should Not Be Visible    client-snackbar
