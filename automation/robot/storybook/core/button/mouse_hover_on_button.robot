*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-hover-default
Force Tags        smoke


*** Keywords ***
Test button state transition between default-hover-default
    [Arguments]        ${button_locator}
    [Documentation]
    ...                verify just the button background-color change with mouse over on button
    ...
    Wait Until Element Is Visible    ${button_locator}
    verify button background-color change on and removing mouse hover    ${button_locator}


*** Test Cases ***                              button_locator
mouse hover on default button                   default
mouse hover on secondary button                 secondary
mouse hover on ghost button                     ghost
mouse hover on ghost Secondary button           ghostSecondary
mouse hover on semantic button                  semantic
    [Tags]    bug-ie-webdriver    bug-firefox-webdriver
