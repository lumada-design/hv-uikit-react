*** Setting ***
Library           SeleniumLibrary
Resource          _resources/button_keywords.robot
Variables         _resources/button_css.yaml
Variables         _resources/button_css_dark.yaml
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between disable-hover-disable
Default Tags      smoke

*** Keywords ***
Test button state transition between disable-hover-disable
    [Arguments]        ${button_locator}    ${css}    ${theme}
    [Documentation]
    ...                verify no css property change with mouse hover on disable button
    ...
    apply storybook theme           ${theme}
    verify button css properties    ${button_locator}    ${css}
    verify CSS properties do not changes with mouse over    ${button_locator}
    remove mouse over button
    verify button css properties    ${button_locator}    ${css}

*** Test Cases ***                                                                    button_locator              CSS                                     theme
state transition disabled-hover-disabled on disabled default button                   disabledPrimary             ${disabledPrimary.css}                  default
state transition disabled-hover-disabled on disabled secondary button                 disabledSecondary           ${disabledSecondary.css}                default
state transition disabled-hover-disabled on disabled ghost button                     disabledGhost               ${disabledGhost.css}                    default
state transition disabled-hover-disabled on disabled ghost Secondary button           disabledGhostSecondary      ${disabledGhostSecondary.css}           default
state transition disabled-hover-disabled on dark disabled default button              disabledPrimary             ${disabledPrimary.css.dark}             dark
state transition disabled-hover-disabled on dark disabled secondary button            disabledSecondary           ${disabledSecondary.css.dark}           dark
state transition disabled-hover-disabled on dark disabled ghost button                disabledGhost               ${disabledGhost.css.dark}               dark
state transition disabled-hover-disabled on dark disabled ghost Secondary button      disabledGhostSecondary      ${disabledGhostSecondary.css.dark}      dark
