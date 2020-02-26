*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke


*** Test Cases ***
close modal on header cross
    [Tags]    bug-ie-webdriver
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled               //button[contains(.,'Success')]          7s
    Click Button                                Success
    Wait Until Element Is Visible               css:div[role='dialog']                   5s
    Click Button                                test-close
    Wait Until Page Does Not Contain Element    css:div[role='dialog']                   10s

close modal clicking ESC keyboard
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled               //button[contains(.,'Success')]          7s
    Click Button                                Success
    Wait Until Element Is Visible               css:div[role='dialog']                   5s
    Press Keys                                  css:div[role='dialog']                   ESCAPE                                   #ESCAPE
    Wait Until Page Does Not Contain Element    css:div[role='dialog']                   10s

close modal clicking out
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled               //button[contains(.,'Success')]          7s
    Click Button                                Success
    Wait Until Element Is Visible               css:div[role='dialog']                   5s
    Click Element                               css:body
    Wait Until Page Does Not Contain Element    css:div[role='dialog']                   10s

all buttons are clickable
    [Tags]    bug-ie-webdriver
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal2
    Wait Until Element Is Enabled               //button[contains(.,'Custom icon')]      7s
    Click Button                                Custom icon
    Wait Until Element Is Visible               css:div[role='dialog']                   5s
    Click Button                                switchAnyway
    Element Should Be Focused                   //button[contains(.,'Switch anyway')]
    Click Button                                Cancel
    Wait Until Page Does Not Contain Element    css:div[role='dialog']                   10s

it is possible insert text in modal input
    [Tags]                                      issue-ie
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal3
    Wait Until Element Is Enabled               css:button                               7s
    Click Button                                Inputs
    Input Text                                  css:input[type='text']                   it is possible insert text on a modal
    Click Button                                Apply
    Click Button                                Cancel
    Wait Until Page Does Not Contain Element    css:div[role='dialog']                   2s
