*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     verify element background-color change on mouse over and mouse out
Test Teardown     Run Keyword If Test Failed    Capture Page Screenshot    ${SUITE_NAME}_${TEST_NAME}.png
Force Tags        smoke


*** Test Cases ***                       button
mouse hover on default button            default
mouse hover on secondary button          secondary
mouse hover on ghost button              ghost
mouse hover on ghost Secondary button    ghostSecondary
mouse hover on semantic button           semantic
    [Tags]    bug-firefox-webdriver    #suspects firefox is putting mouse over on element when is used keyword mouse over css:body
