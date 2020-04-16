*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke                                        

*** Test Cases ***
snackbar 2. with custom icon close after 6 seconds
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-notification-snackbar--custom-icon
    Wait Until Element Is Visible    snackbar2                     7s
    Wait Until Page Contains         This is a snackbar with a custom icon.    2s

snackbar 4. With actions renders an action
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-notification-snackbar--custom-action
    Wait Until Element Is Visible    actionStructure    7s
    Wait Until Page Contains         This is a snackbar             2s
