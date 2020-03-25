*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke                                        

*** Test Cases ***
snackbar 2. with custom icon close after 6 seconds
    go to                            ${STORYBOOK_URL}/iframe.html?id=coresnackbar--snackbar2
    Wait Until Element Is Visible    snackbar2-open-button                     7s
    Click Button                     snackbar2-open-button
    Wait Until Page Contains         This is a snackbar with a custom icon.    2s
    Sleep                            6s                                        # autoHideDuration
    Page Should Not Contain          This is a snackbar with a custom icon.

snackbar 4. With actions renders an action
    go to                            ${STORYBOOK_URL}/iframe.html?id=coresnackbar--snackbar4
    Wait Until Element Is Visible    actionStructure-open-button    7s
    Click Button                     actionStructure-open-button
    Wait Until Page Contains         This is a snackbar             2s
    Sleep                            6s                             # autoHideDuration
    Page Should Not Contain          This is a snackbar
