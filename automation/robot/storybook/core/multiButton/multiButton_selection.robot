*** Setting ***
Library            SeleniumLibrary
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Suite Setup        open storybook
Suite Teardown     Close Browser
Force Tags         smoke

*** Variables ***
${storybook_iframe}    ${STORYBOOK_URL}/iframe.html?id=coremultibutton--

*** Test Cases ***
multiButton when just allow single selection
    Go To                            ${storybook_iframe}labelwithiconverticalsingleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]    10s
    Click Button                     satellite
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map' and contains(@class,'isUnselected')]

multiButton removing all selections
    Go To                            ${storybook_iframe}icononlyhorizontalmultipleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]    10s
    Click Button                     map
    Element Should Be Visible        //button[@id='location' and contains(@class,'isUnselected')]
    Element Should Be Visible        //button[@id='map' and contains(@class,'isUnselected')]

multiButton select all buttons
    Go To                            ${storybook_iframe}icononlyhorizontalmultipleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]    10s
    Click Button                     location
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='location' and contains(@class,'isSelected')]

multiButton unable unselect a fixed selection
    Go To                            ${storybook_iframe}fixedtogglehorizontalmultipleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isSelected')]    10s
    Click Button                     map
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]

multiButton minimum selection
    Go To                            ${storybook_iframe}minimumselectionhorizontalmultipleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isUnselected')]    10s
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isSelected')]
    Click Button                     map1
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isSelected')]
    Click Button                     map
    Click Button                     map1
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isUnselected')]

multiButton input controlled value
    Go To                            ${storybook_iframe}inputcontrolledvalue
    Wait Until Element Is Visible    map    10s    error message: The page don't was visible in 2 seconds
    verify element count             //button[contains(@class,'MultiButton')]    4
    Click Button                     New Props
    verify element count             //button[contains(@class,'MultiButton')]    2

multiButton maximun selection
    Go To                            ${storybook_iframe}maximumselectionhorizontalmultipleselection
    Wait Until Element Is Visible    //button[@id='map' and contains(@class,'isUnselected')]    5s
    Click Button                     map
    Click Button                     satellite
    Click Button                     map1
    Element Should Be Visible        //button[@id='map' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='satellite' and contains(@class,'isSelected')]
    Element Should Be Visible        //button[@id='map1' and contains(@class,'isUnselected')]

