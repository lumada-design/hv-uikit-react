*** Setting ***
Resource       ../_keywords.resource


*** Test Cases ***
multiButton when just allow single selection
    Go To                            ${patterns}multi-button--only-labels
    Wait Until Element Is Visible    css:#map[class*=isSelected]
    Click Button                     satellite
    Element Should Be Visible        css:#satellite[class*=isSelected]
    Element Should Be Visible        css:#map[class*=isUnselected]

multiButton removing all selections
    Go To                            ${patterns}multi-button--only-icons
    Wait Until Element Is Visible    css:#map[class*=isSelected]
    Click Button                     map
    Element Should Be Visible        css:#location[class*=isUnselected]
    Element Should Be Visible        css:#map[class*=isUnselected]

multiButton select all buttons
    Go To                            ${patterns}multi-button--only-icons
    Wait Until Element Is Visible    css:#map[class*=isSelected]
    Click Button                     location
    Element Should Be Visible        css:#map[class*=isSelected]
    Element Should Be Visible        css:#location[class*=isSelected]

multiButton unable unselect a fixed selection
    Go To                            ${patterns}multi-button--enforced-selection
    Wait Until Element Is Visible    css:#map[class*=isSelected]
    Click Button                     map
    Element Should Be Visible        css:#map[class*=isSelected]

multiButton minimum selection
    Go To                            ${patterns}multi-button--minimum-selection
    Wait Until Element Is Visible    css:#map[class*=isUnselected]
    Element Should Be Visible        css:#satellite[class*=isSelected]
    Element Should Be Visible        css:#map1[class*=isSelected]
    Click Button                     map1
    Element Should Be Visible        css:#map1[class*=isSelected]
    Click Button                     map
    Click Button                     map1
    Element Should Be Visible        css:#map[class*=isSelected]
    Element Should Be Visible        css:#map1[class*=isUnselected]

multiButton input controlled value
    Go To                            ${patterns}multi-button--dynamic-content
    Wait Until Element Is Visible    map
    Page Should Contain Element      css:button[class*=MultiButton]    limit=4
    Click Button                     New Props
    Page Should Contain Element      css:button[class*=MultiButton]    limit=2

multiButton maximun selection
    Go To                            ${patterns}multi-button--maximum-selection
    Wait Until Element Is Visible    css:#map[class*=isUnselected]
    Click Button                     map
    Click Button                     satellite
    Click Button                     map1
    Element Should Be Visible        css:#map[class*=isSelected]
    Element Should Be Visible        css:#satellite[class*=isSelected]
    Element Should Be Visible        css:#map1[class*=isUnselected]
