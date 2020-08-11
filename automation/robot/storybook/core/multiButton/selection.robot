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
    Wait Until Element Is Visible    css:#location1[class*=isSelected]
    Click Button                     location1
    Element Should Be Visible        css:#location1[class*=isSelected]

multiButton minimum selection
    Go To                            ${patterns}multi-button--minimum-selection
    Wait Until Element Is Visible    css:#location1[class*=isUnselected]
    Element Should Be Visible        css:#location2[class*=isSelected]
    Element Should Be Visible        css:#location3[class*=isSelected]
    Click Button                     location3
    Element Should Be Visible        css:#location3[class*=isSelected]
    Click Button                     location1
    Click Button                     location3
    Element Should Be Visible        css:#location1[class*=isSelected]
    Element Should Be Visible        css:#location3[class*=isUnselected]

multiButton maximun selection
    Go To                            ${patterns}multi-button--maximum-selection
    Wait Until Element Is Visible    css:#location1[class*=isUnselected]
    Click Button                     location1
    Click Button                     location2
    Click Button                     location3
    Element Should Be Visible        css:#location1[class*=isSelected]
    Element Should Be Visible        css:#location2[class*=isSelected]
    Element Should Be Visible        css:#location3[class*=isUnselected]
