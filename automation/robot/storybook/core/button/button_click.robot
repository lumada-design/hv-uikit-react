*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       Run Keywords
...               open storybook    ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke
...               AND               Wait Until Element Is Visible    css:button    10s
Suite Teardown    Close Browser
Test Template     Activate and focus button when it is clicked
Force Tags        smoke    bug-edge-webdriver    bug-infrastructure-ie


*** Comments ***
bug-edge-webdriver  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/


*** Keywords ***
Activate and focus button when it is clicked
    [Arguments]        ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}


*** Test Cases ***                                                    button         
activate and focus button when is clicked a default button            default
    
activate and focus button when is clicked a secondary button          secondary
            
activate and focus button when is clicked a ghost button              ghost
    
activate and focus button when is clicked a ghost Secondary button    ghostSecondary
    
activate and focus button when is clicked a semantic button           semantic
    
unable Activate and focus a disabled button when it is clicked
    [Template]                       NONE
    Element Should Be Disabled       disabledPrimary
    Click Button                     disabledPrimary    
    Alert Should Not Be Present

