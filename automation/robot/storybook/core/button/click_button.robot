*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-focus
Default Tags      smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver:  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify button is focused when a button is clicked
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    remove mouse hover button
    Element Should Be Focused    ${button_locator}

*** Test Cases ***                        button            theme    
click on dawn default button              default           dawn     
click on dawn secondary button            secondary         dawn     
click on dawn ghost button                ghost             dawn     
click on dawn ghost Secondary button      ghostSecondary    dawn     
click on wicked default button            default           wicked   
click on wicked secondary button          secondary         wicked   
click on wicked ghost button              ghost             wicked   
click on wicked ghost Secondary button    ghostSecondary    wicked   