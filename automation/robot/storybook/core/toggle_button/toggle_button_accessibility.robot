*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify toggle button accessibility as standard
Force Tags       pa11y

*** Keywords ***
verify toggle button accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=coretogglebutton--${sample}    ${standard}    ${optional}

*** Test Cases ***                                      #sample    #options
storybook sample sample1 against standard WCAG2AA       sample1
storybook sample sample2 against standard WCAG2AA       sample2
storybook sample sample3 against standard WCAG2AA       sample3
