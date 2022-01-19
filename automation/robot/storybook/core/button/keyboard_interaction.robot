*** Setting ***
Resource       ../_keywords.resource
Suite Setup    Run Keywords
...            Go To    ${tests}button--smoke-tests
...            AND    Wait Until Element Is Visible    default
Force Tags     keyboard


*** Test Cases ***
tab: move focus to next button when TAB is pressed
    Set Focus To Element         default
    Press Keys                   None    TAB
    Element Should Be Focused    secondary
    Press Keys                   None    SHIFT+TAB
    Element Should Be Focused    default

space: activates the button when it is focused and is pressed SPACE
    Set Focus To Element         secondary
    Press Keys                   None    SPACE
    Alert Should Be Present
    Element Should Be Focused    secondary

enter: activates the button when it is focused and is pressed ENTER
    Set Focus To Element         secondary
    Press Keys                   None    ENTER
    Alert Should Be Present
    Element Should Be Focused    secondary
