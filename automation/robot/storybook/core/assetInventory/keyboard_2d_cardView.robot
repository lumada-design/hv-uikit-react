*** Setting ***
Library           SeleniumLibrary
Resource          _keywords.resource
Suite Setup       Run Keywords
...               open storybook    AND
...               filter cards and reduce Window size
Test Template     move focus from-to locator when pressed keyboard
Suite Teardown    Close Browser
Force Tags        smoke    keyboard
Documentation     https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html
...               Not implemented: Page Up, Page Down, Control + Home, Control + End


*** Test Cases ***                                                      from        keyboard       to
focus next card when pressed arrow right                                ${card1}    ARROW_RIGHT    ${card2}
focus previous card when pressed arrow left                             ${card2}    ARROW_LEFT     ${card1}
focus vertical ascending card when pressed arrow up                     ${card6}    ARROW_UP       ${card3}
focus vertical descending card when pressed arrow down                  ${card1}    ARROW_DOWN     ${card4}
focus first card when pressed home                                      ${card6}    HOME           ${card1}
focus last card when pressed arrow end                                  ${card1}    END            ${card6}
#when focus does not move
focus does not move when pressed right on right-most cell in the row    ${card3}    ARROW_RIGHT    ${card3}
focus does not move when pressed left on left-most cell in the row      ${card4}    ARROW_LEFT     ${card4}
focus does not move when pressed right on last card                     ${card6}    ARROW_RIGHT    ${card6}
focus does not move when pressed left on first card                     ${card1}    ARROW_LEFT     ${card1}
focus does not move when pressed up on first card                       ${card1}    ARROW_UP       ${card1}
focus does not move card when pressed down on last card                 ${card6}    ARROW_DOWN     ${card6}
focus card elements and then next card when pressed tab
    [Template]    NONE
    filter cards and reduce Window size
    Click Element                             ${card1}
    Press Keys                                NONE    TAB    TAB    TAB    TAB    TAB
    Element Should Be Focused                 ${card2} input
    element attribute value should contain    ${card2}    class    -focused
