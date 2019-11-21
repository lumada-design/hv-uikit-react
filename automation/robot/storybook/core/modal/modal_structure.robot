*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
close modal on header cross
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled      //button[contains(.,'success')]    7s
    Click Button                       success
    Wait Until Element Is Visible      css:div[role='dialog']             2s
    Click Button                       //button[contains(@class,'Main-closeButton')]
    Page Should Not Contain Element    css:div[role='dialog']

close modal clicking ESC keyboard
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled               //button[contains(.,'success')]    7s
    Click Button                                success
    Wait Until Element Is Visible               css:div[role='dialog']             2s
    Press Keys                                  css:div[role='dialog']             ESCAPE    #ESCAPE
    Wait Until Page Does Not Contain Element    css:div[role='dialog']             2s

close modal clicking out
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled               //button[contains(.,'success')]    7s
    Click Button                                success
    Wait Until Element Is Visible               css:div[role='dialog']             2s
    Click Element                               css:body
    Wait Until Page Does Not Contain Element    css:div[role='dialog']             2s

all buttons are clickable
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coremodal--modal2
    Wait Until Element Is Enabled    //button[contains(.,'Custom icon')]      7s
    Click Button                     Custom icon
    Wait Until Element Is Visible    css:div[role='dialog']                   2s
    Click Button                     Switch anyway
    Element Should Be Focused        //button[contains(.,'Switch anyway')]
    Click Button                     Cancel
    Element Should Be Focused        //button[contains(.,'Cancel')]

it is possible insert text in modal input
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coremodal--modal3
    Wait Until Element Is Enabled      //button[contains(.,'inputs')]    7s
    Click Button                       inputs
    Input Text                         css:input[type='text']            it is possible insert text on a modal
    Click Button                       Send Work Request
    Click Button                       Cancel
    Click Button                       //button[contains(@class,'Main-closeButton')]
    Page Should Not Contain Element    css:div[role='dialog']
