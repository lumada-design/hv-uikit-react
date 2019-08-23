*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-hover-default
Default Tags      smoke

*** Keywords ***
Test button state transition between default-hover-default
    [Arguments]        ${button_locator}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on default button
    ...
    apply storybook theme           ${theme}
    verify button background-color change with mouse over    ${button_locator}
    remove mouse over button

*** Test Cases ***                                                         button_locator     theme
state transition default-hover-default on default button                   default            default
state transition default-hover-default on secondary button                 secondary          default
state transition default-hover-default on ghost button                     ghost              default
state transition default-hover-default on ghost Secondary button           ghostSecondary     default
state transition default-hover-default on dark default button              default            dark
state transition default-hover-default on dark secondary button            secondary          dark
state transition default-hover-default on dark ghost button                ghost              dark
state transition default-hover-default on dark ghost Secondary button      ghostSecondary     dark
