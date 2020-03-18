*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between focus-default
Force Tags        smoke


*** Keywords ***
Test button state transition between focus-default
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify button lost the focus state when is clicked other element
    Set Focus To Element             ${button_locator}
    Element Should Be Focused        ${button_locator}
    Press Keys                       NONE                 TAB
    Element Should Be Enabled        ${button_locator}
    verify element is not focused    ${button_locator}


*** Test Cases ***                               button_locator
remove focus on default button                   default
remove focus on secondary button                 secondary
remove focus on ghost button                     ghost
remove focus on ghost Secondary button           ghostSecondary
remove focus on semantic button                  semantic
