*** Setting ***
Library           SeleniumLibrary
Resource          keywords.resource
Variables         variables.yaml
Suite Setup       open storybook
Test Template     Run Keyword
Suite Teardown    Close Browser
Force Tags        smoke    keyboard


*** Test Cases ***
drop menu with ENTER    drop menu when is focused and is pressed keyboard    ENTER
drop menu with DOWN     drop menu when is focused and is pressed keyboard    ARROW_DOWN

close menu with ENTER    close menu when is focused and is pressed keyboard    ENTER
close menu with UP       close menu when is focused and is pressed keyboard    ARROW_UP

activates item with ENTER    activates item and close menu when item is focused and is pressed keyboard    ENTER

focus next item                move focus from item to other is pressed keyboard    ${item1}    ARROW_DOWN    ${item2}
    [Documentation]    also test: Disabled menu items are focusable
focus previous item            move focus from item to other is pressed keyboard    ${item2}    ARROW_UP      ${item1}
focus first item               move focus from item to other is pressed keyboard    ${item2}    HOME          ${item1}
focus last item                move focus from item to other is pressed keyboard    ${item2}    END           ${item3}
from last item focus first     move focus from item to other is pressed keyboard    ${item3}    ARROW_DOWN    ${item1}
from first item focus last     move focus from item to other is pressed keyboard    ${item1}    ARROW_UP      ${item3}
focus button and close menu    move focus from item to other is pressed keyboard    ${item1}    TAB           ${dropDownMenu}
    
pass focus to menu items
    [Template]  NONE
    Go To                               ${STORYBOOK_URL}/${sampledDisabledItems}
    Wait Until Page Contains Element    ${dropDownMenu}    10s
    Click Element                       ${dropDownMenu}
    Wait Until Element Is Visible       ${item1}           5s
    Press Keys                          NONE               TAB
    Element Should Be Focused           ${item1}