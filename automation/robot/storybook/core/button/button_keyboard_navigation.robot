*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       Run Keywords
...               open storybook    ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke
...               AND               Wait Until Element Is Visible    css:button    10s
Suite Teardown    Close Browser
Force Tags        smoke    keyboard    bug-infrastructure-ie

*** Test Cases ***
tab: move focus to next button when TAB is pressed
    Set Focus To Element         default
    Press Keys                   None         TAB
    Element Should Be Focused    secondary
    Press Keys                   None         SHIFT+TAB
    Element Should Be Focused    default

space: activates the button when it is focused and is pressed SPACE
    Set Focus To Element         secondary
    Press Keys                   None         SPACE
    Alert Should Be Present
    Element Should Be Focused    secondary

enter: activates the button when it is focused and is pressed ENTER
    Set Focus To Element         secondary
    Press Keys                   None         ENTER
    Alert Should Be Present
    Element Should Be Focused    secondary
