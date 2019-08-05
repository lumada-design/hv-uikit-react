*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Variables         _resources/button_css.yaml
Variables         _resources/button_css_dark.yaml
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-hover-default
Default Tags      smoke

*** Keywords ***
Test button state transition between default-hover-default
    [Arguments]        ${button_locator}    ${css}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on default button
    ...
    apply storybook theme           ${theme}
    verify button css properties    ${button_locator}    ${css}
    verify button background-color change with mouse over    ${button_locator}
    remove mouse over button
    verify button css properties    ${button_locator}    ${css}

*** Test Cases ***                                                         button_locator      CSS                             theme
state transition default-hover-default on default button                   default             ${default.css}                  default
state transition default-hover-default on secondary button                 secondary           ${secondary.css}                default
state transition default-hover-default on ghost button                     ghost               ${ghost.css}                    default
state transition default-hover-default on ghost Secondary button           ghostSecondary      ${ghostSecondary.css}           default
state transition default-hover-default on dark default button              default             ${default.css.dark}             dark
state transition default-hover-default on dark secondary button            secondary           ${secondary.css.dark}           dark
state transition default-hover-default on dark ghost button                ghost               ${ghost.css.dark}               dark
state transition default-hover-default on dark ghost Secondary button      ghostSecondary      ${ghostSecondary.css.dark}      dark
