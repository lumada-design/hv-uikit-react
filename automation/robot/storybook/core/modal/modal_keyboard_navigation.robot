*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    keyboard


*** Test Cases ***
First element is focused
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled    Success                   10s
    Click Button                     Success
    Wait Until Element Is Visible    css:div[role='dialog']    10s
    Element Should Be Focused        test-close
    verify element is not focused    switchAnyway
    
SwitchAnyway button is focused
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coremodal--modal2
    Wait Until Element Is Enabled    modalButton               7s
    Click Button                     modalButton
    Wait Until Element Is Visible    css:div[role='dialog']    10s
    Element Should Be Focused        switchAnyway
    verify element is not focused    test-close
    
Focus trap works
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coremodal--modal1
    Wait Until Element Is Enabled    Success                   10s
    Click Button                     Success
    Wait Until Element Is Visible    css:div[role='dialog']    10s
    Element Should Be Focused        test-close
    Press Keys                       css:div[role='dialog']    TAB     
    Element Should Be Focused        switchAnyway
    Press Keys                       None                      TAB     
    Element Should Be Focused        cancel
    Press Keys                       None                      TAB 
    Element Should Be Focused        test-close