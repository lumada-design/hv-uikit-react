*** Setting ***
Resource           ../../_resources/keywords.resource
Suite Setup        open storybook
Suite Teardown     Close Browser
Default Tags       smoke

*** Variables ***
${storybook_iframe}    ${components}multi-button--

*** Test Cases ***
multiButton when just allow single selection
    Go To                            ${storybook_iframe}only-labels
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]
    Click Button                     satellite
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map' and contains(@class,'isUnselected')]

multiButton removing all selections
    Go To                            ${storybook_iframe}only-icons
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]
    Click Button                     map
    Element Should Be Visible        //button[@id='location' and contains(@class,'isUnselected')]
    Element Should Be Visible        //button[@id='map' and contains(@class,'isUnselected')]

multiButton select all buttons
    Go To                            ${storybook_iframe}only-icons
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]
    Click Button                     location
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='location' and contains(@class,'isSelected')]

multiButton unable unselect a fixed selection
    Go To                            ${storybook_iframe}enforced-selection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]
    Click Button                     map
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]

multiButton minimum selection
    Go To                            ${storybook_iframe}minimum-selection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isUnselected')]
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isSelected')]
    Click Button                     map1
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isSelected')]
    Click Button                     map
    Click Button                     map1
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isUnselected')]

multiButton input controlled value
    Go To                            ${storybook_iframe}dynamic-content
    Wait Until Element Is Visible    map
    Page Should Contain Element      //button[contains(@class,'MultiButton')]    limit=4
    Click Button                     New Props
    Page Should Contain Element      //button[contains(@class,'MultiButton')]    limit=2

multiButton maximun selection
    Go To                            ${storybook_iframe}maximum-selection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isUnselected')]
    Click Button                     map
    Click Button                     satellite
    Click Button                     map1
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isUnselected')]
