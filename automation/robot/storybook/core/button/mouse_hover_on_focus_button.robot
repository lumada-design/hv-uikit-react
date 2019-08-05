*** Setting ***
Library             SeleniumLibrary
Resource            _resources/button_keywords.robot
Variables           _resources/button_css.yaml
Variables           _resources/button_css_dark.yaml
Suite Setup         open storybook button page
Suite Teardown      Close Browser
Test Template       Test button state transition between focus-hover-focus
Default Tags        smoke

*** Keywords ***
Test button state transition between focus-hover-focus
    [Arguments]        ${button_locator}    ${css}    ${theme}
    [Documentation]
    ...                verify just the button background-color change with mouse over on pressed/focus button
    ...
    apply storybook theme           ${theme}
    Click Button                    ${button_locator}
    Alert Should Be Present
    verify button css properties    ${button_locator}    ${css}
    verify button background-color change with mouse over    ${button_locator}
    remove mouse over button
    verify button css properties    ${button_locator}    ${css}

*** Test Cases ***                                                     button_locator      CSS                             theme
state transition focus-hover-focus on default button                   default             ${default.css}                  default
state transition focus-hover-focus on secondary button                 secondary           ${secondary.css}                default
state transition focus-hover-focus on ghost button                     ghost               ${ghost.css}                    default
state transition focus-hover-focus on ghost Secondary button           ghostSecondary      ${ghostSecondary.css}           default
state transition focus-hover-focus on dark default button              default             ${default.css.dark}             dark
state transition focus-hover-focus on dark secondary button            secondary           ${secondary.css.dark}           dark
state transition focus-hover-focus on dark ghost button                ghost               ${ghost.css.dark}               dark
state transition focus-hover-focus on dark ghost Secondary button      ghostSecondary      ${ghostSecondary.css.dark}      dark
