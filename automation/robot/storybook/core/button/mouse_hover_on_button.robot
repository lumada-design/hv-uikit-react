*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Library           RobotEyes                           ${TOLERANCE}
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Setup        setup RobotEyes
Test Template     Test button state transition between default-hover-default
Default Tags      smoke

*** Keywords ***
Test button state transition between default-hover-default
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on button
    ...
    apply storybook theme            ${theme}
    Wait Until Element Is Visible    ${button_locator}
    verify button background-color change with mouse over    ${button_locator}
    capture image of                 id=${button_locator}
    remove mouse over button
    capture image of                 id=${button_locator}
    Compare Images

*** Test Cases ***                              button_locator     theme
mouse hover on default button                   default            default
mouse hover on secondary button                 secondary          default
mouse hover on ghost button                     ghost              default
mouse hover on ghost Secondary button           ghostSecondary     default
mouse hover on dark default button              default            dark
mouse hover on dark secondary button            secondary          dark
mouse hover on dark ghost button                ghost              dark
mouse hover on dark ghost Secondary button      ghostSecondary     dark
