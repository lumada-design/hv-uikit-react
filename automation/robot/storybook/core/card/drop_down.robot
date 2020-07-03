*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
click on button Add on card
    Go To                            ${components}card--automatic-actions
    Wait Until Element Is Enabled    css:button
    Click Button                     Add
    Alert Should Be Present          You have pressed Add

click on button 3 dots Delete on 9 Automatic action creation from list
    Go To                            ${components}card--automatic-actions
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']
    Click Element                    //p[text()='Delete']
    Alert Should Be Present          You have pressed Delete

unable click on preview and upload button
    Go To                            ${components}card--automatic-actions
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']
    Element Should Be Visible        ${option_Preview}
    Element Should Be Visible        ${option_Upload}
    Element Should Be Visible        ${option_Delete}


*** Variables ***
${option_Preview}    //li[contains(@class,'List-disabled') and contains(.,'Preview')]
${option_Upload}     //li[contains(@class,'List-disabled') and contains(.,'Upload')]
${option_Delete}     //li[not(contains(@class,'List-disabled')) and contains(.,'Delete')]
