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
single selection list select a item by pressing ENTER
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item5}    aria-selected    ${None}
    Set Focus To Element                          ${item5}
    Press Keys                                    ${None}     ENTER
    Element Attribute Value Should Be             ${item5}    aria-selected    true

single selection list unselect a item by pressing ENTER
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item3}    aria-selected    true
    Set Focus To Element                          ${item3}
    Press Keys                                    ${None}     ENTER
    Element Attribute Value Should Be             ${item3}    aria-selected    ${None}

single selection list can select item by pressing SPACE
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--single-selection
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item5}    aria-selected    ${None}
    Set Focus To Element                          ${item5}
    Press Keys                                    ${None}     SPACE
    Element Attribute Value Should Be             ${item5}    aria-selected   true

multiple selection list select a item by pressing SPACE
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item5}    aria-selected    ${None}
    Set Focus To Element                          ${item5}
    Press Keys                                    ${None}     SPACE
    Element Attribute Value Should Be             ${item5}    aria-selected    true

multiple selection list unselect a item by pressing SPACE
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item3}    aria-selected    true
    Set Focus To Element                          ${item3}
    Press Keys                                    ${None}     SPACE
    Element Attribute Value Should Be             ${item3}    aria-selected    ${None}

multiple selection list can not select item by pressing ENTER
    Go To                                         ${STORYBOOK_URL}/iframe.html?id=corelist--multiselection-all
    Wait Until Element Is Visible                 ${list}     10s
    Element Attribute Value Should Be             ${item5}    aria-selected    ${None}
    Set Focus To Element                          ${item5}
    Press Keys                                    ${None}     ENTER
    Element Attribute Value Should Be             ${item5}    aria-selected    ${None}
