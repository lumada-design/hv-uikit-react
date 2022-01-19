*** Setting ***
Resource         ../_keywords.resource
Suite Setup      Run Keywords
...              Go To    ${tests}button--smoke-tests
...              AND    Wait Until Element Is Visible    default
Test Template    Activate and focus button when it is clicked


*** Test Cases ***                                              button
activate and focus button when is clicked a default button      default

activate and focus button when is clicked a secondary button    secondary

activate and focus button when is clicked a ghost button        ghost

activate and focus button when is clicked a semantic button     semantic

unable to activate and focus a disabled button when it is clicked
    [Template]                       NONE
    Element Should Be Disabled       disabledPrimary
    Click Button                     disabledPrimary
    Alert Should Not Be Present


*** Keywords ***
Activate and focus button when it is clicked
    [Arguments]    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
