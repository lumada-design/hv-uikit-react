*** Setting ***
Library           SeleniumLibrary
Resource          _bulkActions.resource
Suite Setup       open storybook    ${iframeBulkActions}
Test Setup        Run Keywords
...               go to    ${iframeBulkActions}    AND
...               Wait Until Page Contains Element    ${parentCheckbox}    timeout=10s
Suite Teardown    Close Browser
Force Tags        smoke    keyboard


*** Test Cases ***
tab sequence from checkbox to actions when actions are enable
    Select Checkbox              ${parentCheckbox}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${actionAdd}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${actionDelete}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${actionMore}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${checkbox0}

tab sequence from checkbox to next page element when actions are disable
    Unselect Checkbox            ${parentCheckbox}
    Press Keys                   NONE    TAB    TAB
    Element Should Be Focused    ${checkbox0}

#space select and unselect check box
#    Unselect Checkbox                  ${parentCheckbox}
#    Press Keys                         NONE    TAB    SPACE
#    Checkbox Should Be Selected        ${parentCheckbox}
#    Press Keys                         NONE    SPACE
#    Checkbox Should Not Be Selected    ${parentCheckbox}
