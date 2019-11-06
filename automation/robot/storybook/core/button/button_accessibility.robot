*** Setting ***
Resource         ../../_resources/accessibility.robot
Variables        ../../_resources/storybook_variables.yaml
Test Template    verify button accessibility as standard
Force Tags       pa11y

*** Keywords ***
verify button accessibility as standard
    [Arguments]    ${sample}    ${optional}=--root-element "\#root > div.Component-content-4"    ${standard}=${PA11Y_STANDARD}
    verify element accessibility as standard   ${STORYBOOK_URL}/iframe.html?id=corebutton--${sample}    ${standard}    ${optional}

*** Test Cases ***                                        #sample    #options
storybook samples smoke against accessibility standard    smoke
