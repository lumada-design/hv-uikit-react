*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke keyboard
Documentation     just tests of iterating on List element with keyboards

*** Test Cases ***
navigate to next item by pressing DOWN
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible             ${list}     10s
    Set Focus To Element                      ${item1}
    Press Keys                                ${None}     DOWN
    element attribute value should contain    ${item2}    class    focused
    Press Keys                                ${None}     DOWN
    element attribute value should contain    ${item3}    class    focused
    wait until element attribute value does not contain    ${item2}    class    focused    500ms

navigate to previous item by pressing UP
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible             ${list}     10s
    Set Focus To Element                      ${item5}
    Press Keys                                ${None}     UP
    element attribute value should contain    ${item4}    class    focused
    Press Keys                                ${None}     UP
    element attribute value should contain    ${item3}    class    focused
    wait until element attribute value does not contain    ${item4}    class    focused    500ms

keep on last item when pressing DOWN
    [Documentation]    not working in ie (get out of element)
    [Tags]    issue-ie
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible             ${list}     10s
    Set Focus To Element                      ${item5}
    Press Keys                                ${None}     DOWN
    element attribute value should contain    ${item1}    class    focused

keep on first item when pressing UP
    Go To                                     ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible             ${list}     10s
    Set Focus To Element                      ${item1}
    Press Keys                                ${None}     UP
    element attribute value should contain    ${item5}    class    focused

exit from item list with TAB
    [Documentation]  = Know problem waiting resolution in this sprint =
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible                 ${list}     10s
    Set Focus To Element                          ${item1}
    Press Keys                                    ${None}     TAB
    element attribute value should not contain    ${item1}    class    focused
    element attribute value should not contain    ${item2}    class    focused

single selection list first item receives focus when not selected
# If none of the options are selected before the listbox receives focus, the first option receives focus.
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection-not-selected
    Wait Until Element Is Visible                 ${list}     10s
    Element Should Be Visible                     //button[@id='anchorButton']
    Set Focus To Element                          //button[@id='anchorButton']
    Press Keys                                    ${None}     TAB
    Element Attribute Value Should Be             ${item1}    aria-selected   ${None}
    element attribute value should contain        ${item1}    class    focused

single selection list first item receives focus when option is selected
# If an option is selected before the listbox receives focus, focus is set on the selected option.
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection-focusable-selection
    Wait Until Element Is Visible                 ${list}     10s
    Element Should Be Visible                     //button[@id='anchorButton']
    Set Focus To Element                          //button[@id='anchorButton']
    Press Keys                                    ${None}     TAB
    element attribute value should contain        ${item1}    class    focused
    Element Attribute Value Should Be             ${item1}    aria-selected   true

simple list as menubar should focus disabled elements
# disabled item should still be focusable.
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--simple-list-not-selectable-with-disabled
    Wait Until Element Is Visible                 //button[@id='anchorButton']     10s
    Element Should Be Visible                     //button[@id='anchorButton']
    Set Focus To Element                          //button[@id='anchorButton']
    Press Keys                                    ${None}     TAB
    element attribute value should contain        ${item1}    class    focused
    element attribute value should contain        ${item1}    class    disabled

single selection list disabled items should not receive focus
# If an option is selected before the listbox receives focus, focus is set on the selected option.
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-item-disabled
    Wait Until Element Is Visible                 ${list}     10s
    Set Focus To Element                          ${item3}
    Element Attribute Value Should Be             ${item3}    aria-selected   true
    Press Keys                                    ${None}     DOWN
    element attribute value should contain        ${item5}    class    focused
