*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          _resources/button_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook button page
Suite Teardown    Close Browser
Test Template     Test button state transition between default-focus
Default Tags      smoke    bug-edge-webdriver

*** Comments ***
bug-edge-webdriver:  https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16448300/

*** Keywords ***
Test button state transition between default-focus
    [Arguments]        ${button_locator}    ${theme}    ${baseline}
    [Documentation]
    ...                verify button is focused when a button is clicked
    ...
    apply storybook theme        ${theme}
    Click Button                 ${button_locator}
    Alert Should Be Present
    Element Should Be Focused    ${button_locator}
    compare images               ${CURDIR}/baseline/${baseline}    ${button_locator}     ${theme}_focus_${button_locator}_${BROWSER}.png    ${TOLERANCE}

*** Test Cases ***                        button            theme     baseline                               
click on dawn default button              default           dawn      focus_default_${BROWSER}.png           
click on dawn secondary button            secondary         dawn      dawn_focus_secondary_${BROWSER}.png
click on dawn ghost button                ghost             dawn      dawn_focus_ghost_${BROWSER}.png
click on dawn ghost Secondary button      ghostSecondary    dawn      dawn_focus_ghostSecondary_${BROWSER}.png
click on wicked default button            default           wicked    focus_default_${BROWSER}.png           
click on wicked secondary button          secondary         wicked    wicked_focus_secondary_${BROWSER}.png
click on wicked ghost button              ghost             wicked    wicked_focus_ghost_${BROWSER}.png
click on wicked ghost Secondary button    ghostSecondary    wicked    wicked_focus_ghostSecondary_${BROWSER}.png