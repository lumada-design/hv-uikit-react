*** Setting ***
Resource       ../_keywords.resource


*** Test Cases ***
multiButton when just allow single selection
    Go To                            ${forms}multi-button--only-labels
    Wait Until Element Is Visible    css:#map[class*=HvMultiButton-selected]
    Click Button                     satellite
    Element Should Be Visible        css:#satellite[class*=HvMultiButton-selected]
    Element Should Not Be Visible    css:#map[class*=HvMultiButton-selected]

multiButton removing all selections
    Go To                            ${forms}multi-button--only-icons
    Wait Until Element Is Visible    css:#map[class*=HvMultiButton-selected]
    Click Button                     map
    Element Should Not Be Visible    css:#location[class*=HvMultiButton-selected]
    Element Should Not Be Visible    css:#map[class*=HvMultiButton-selected]

multiButton select all buttons
    Go To                            ${forms}multi-button--only-icons
    Wait Until Element Is Visible    css:#map[class*=HvMultiButton-selected]
    Click Button                     location
    Element Should Be Visible        css:#map[class*=HvMultiButton-selected]
    Element Should Be Visible        css:#location[class*=HvMultiButton-selected]

multiButton unable unselect a fixed selection
    Go To                            ${forms}multi-button--enforced-selection
    Wait Until Element Is Visible    css:#location1[class*=HvMultiButton-selected]
    Click Button                     location1
    Element Should Be Visible        css:#location1[class*=HvMultiButton-selected]

multiButton minimum selection
    Go To                            ${forms}multi-button--minimum-selection
    Wait Until Element Is Visible    location1
    Element Should Be Visible        css:#location2[class*=HvMultiButton-selected]
    Element Should Be Visible        css:#location3[class*=HvMultiButton-selected]
    Click Button                     location3
    Element Should Be Visible        css:#location3[class*=HvMultiButton-selected]
    Click Button                     location1
    Click Button                     location3
    Element Should Be Visible        css:#location1[class*=HvMultiButton-selected]
    Element Should Not Be Visible    css:#location3[class*=HvMultiButton-selected]

multiButton maximun selection
    Go To                            ${forms}multi-button--maximum-selection
    Wait Until Element Is Visible    location1
    Click Button                     location1
    Click Button                     location2
    Click Button                     location3
    Element Should Be Visible        css:#location1[class*=HvMultiButton-selected]
    Element Should Be Visible        css:#location2[class*=HvMultiButton-selected]
    Element Should Not Be Visible    css:#location3[class*=HvMultiButton-selected]
