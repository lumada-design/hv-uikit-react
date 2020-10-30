*** Setting ***
Resource      _bulkActions.resource
Test Setup    open bulk action sample    with-actions
Force Tags    keyboard


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
    Element Should Be Focused    ${checkbox}\[2]

tab sequence from checkbox to next page element when actions are disable
    Select Checkbox              ${parentCheckbox}
    Unselect Checkbox            ${parentCheckbox}
    Press Keys                   NONE    TAB
    Element Should Be Focused    ${checkbox}\[2]
