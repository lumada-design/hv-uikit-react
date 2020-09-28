*** Setting ***
Resource    _resources.resource
Force Tags  v3


*** Test Cases ***
click on button Add on card
    Go To                            ${components}card--with-composition
    Wait Until Element Is Enabled    css:button
    Click Button                     post
    Alert Should Be Present          You have pressed Upload

click on button 3 dots Delete on 9 Automatic action creation from list
    Go To                            ${components}card--with-composition
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']
    Click Element                    ${option_Delete}
    Alert Should Be Present          You have pressed Delete

unable click on preview and upload button
    Go To                            ${components}card--with-composition
    Wait Until Element Is Enabled    css:button[class*='HvDropDownMenu']
    Click Element                    css:button[class*='HvDropDownMenu']
    Wait Until Element Is Enabled    css:ul[role='menu']
    Element Should Be Visible        ${option_Preview}
    Element Should Be Visible        ${option_Add}
    Element Should Be Visible        ${option_Delete}


*** Variables ***
${option_Preview}    //li[contains(@class,'HvListItem-disabled') and contains(.,'Preview')]
${option_Add}     //li[contains(@class,'HvListItem-disabled') and contains(.,'Add')]
${option_Delete}     //li[not(contains(@class,'HvListItem-disabled')) and contains(.,'Delete')]
