*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-focus
Force Tags        smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver:  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify button is focused when a button is clicked
    ...
    Click Button                 ${button_locator}
    Alert Should Be Present
    remove mouse hover button
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                        button         
click on dawn default button              default        
click on dawn secondary button            secondary      
click on dawn ghost button                ghost          
click on dawn ghost Secondary button      ghostSecondary 
click on dawn semantic button             semantic
