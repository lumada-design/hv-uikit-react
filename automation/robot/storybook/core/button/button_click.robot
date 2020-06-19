*** Setting ***
Resource          ../../_resources/keywords.resource
Suite Setup       Run Keywords
...               open storybook    ${components}button--smoke-tests
...               AND               Wait Until Element Is Visible    css:button
Suite Teardown    Close Browser
Test Template     Activate and focus button when it is clicked
Force Tags        smoke    bug-edge-webdriver


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

unable to activate and focus a disabled button when it is clicked
    [Template]                       NONE
    Element Should Be Disabled       disabledPrimary
    Click Button                     disabledPrimary
    Alert Should Not Be Present
