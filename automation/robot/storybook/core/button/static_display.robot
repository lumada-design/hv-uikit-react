*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Library           RobotEyes                           ${TOLERANCE}
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Setup        setup RobotEyes
Test Template     Test static display of button
Default Tags      smoke    

*** Keywords ***
Test static display of button
    [Arguments]        ${theme}
    [Documentation]
    ...                verify button is focused when a button is clicked
    ...
    apply storybook theme        ${theme}
    Capture Full Screen    
    Compare Images

*** Test Cases ***      theme
button default theme    default
button dark theme       dark
