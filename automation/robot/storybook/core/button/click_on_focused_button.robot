*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test there is no state transition on click a focused button
Default Tags      smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test there is no state transition on click a focused button
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify a focused button don't change when is clicked
    ...
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                              button         
click on focus default button                   default        
click on focus secondary button                 secondary      
click on focus ghost button                     ghost          
click on focus ghost Secondary button           ghostSecondary 
click on focus semantic button                  semantic
