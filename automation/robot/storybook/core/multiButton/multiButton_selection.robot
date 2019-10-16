*** Setting ***
Library            SeleniumLibrary
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Suite Setup        open storybook
Suite Teardown     Close Browser
Default Tags       smoke

*** Variables ***
${storybook_iframe}    ${STORYBOOK_URL}/iframe.html?id=coremultibutton--

*** Test Cases ***
multiButton when just allow single selection
    Go To                                ${storybook_iframe}labelwithiconverticalsingleselection
    Wait Until Element Is Visible        map          10s                        error message: The page don't was visible in 2 seconds
    Element Attribute Value Should Be    map          data-selectionindicator    isSelectedVertical
    Click Button                         satellite
    Element Attribute Value Should Be    satellite    data-selectionindicator    isSelectedVertical
    Element Attribute Value Should Be    map          data-selectionindicator    ${EMPTY}

multiButton removing all selections
    Go To                                ${storybook_iframe}icononlyhorizontalmultipleselection
    Wait Until Element Is Visible        map         10s                        error message: The page don't was visible in 2 seconds
    Element Attribute Value Should Be    map         data-selectionindicator    isSelected
    Click Button                         map
    Element Attribute Value Should Be    map         data-selectionindicator    ${EMPTY}
    Element Attribute Value Should Be    location    data-selectionindicator    ${EMPTY}

multiButton select all buttons
    Go To                                ${storybook_iframe}icononlyhorizontalmultipleselection
    Wait Until Element Is Visible        map         10s                        error message: The page don't was visible in 2 seconds
    Element Attribute Value Should Be    map         data-selectionindicator    isSelected
    Click Button                         location
    Element Attribute Value Should Be    map         data-selectionindicator    isSelected
    Element Attribute Value Should Be    location    data-selectionindicator    isSelected

multiButton unable unselect a fixed selection
    Go To                                ${storybook_iframe}fixedtogglehorizontalmultipleselection
    Wait Until Element Is Visible        map    10s                        error message: The page don't was visible in 2 seconds
    Element Attribute Value Should Be    map    data-selectionindicator    isSelected
    Click Button                         map
    Element Attribute Value Should Be    map    data-selectionindicator    isSelected

multiButton minimum selection
    Go To                                ${storybook_iframe}minimumselectionhorizontalmultipleselection
    Wait Until Element Is Visible        map          10s                        error message: The page don't was visible in 2 seconds
    Element Attribute Value Should Be    satellite    data-selectionindicator    isSelected
    Element Attribute Value Should Be    map          data-selectionindicator    ${EMPTY}
    Element Attribute Value Should Be    map1         data-selectionindicator    isSelected
    Click Button                         map1
    Element Attribute Value Should Be    map1         data-selectionindicator    isSelected
    Click Button                         map
    Click Button                         map1
    Element Attribute Value Should Be    map          data-selectionindicator    isSelected
    Element Attribute Value Should Be    map1         data-selectionindicator    ${EMPTY}

multiButton input controlled value
    Go To                            ${storybook_iframe}inputcontrolledvalue
    Wait Until Element Is Visible    map    10s    error message: The page don't was visible in 2 seconds
    verify element count             //div[@class='MultiButton-root-147']//button    4
    Click Button                     New Props
    verify element count             //div[@class='MultiButton-root-147']//button    2

multiButton maximun selection
    Go To                                ${storybook_iframe}maximumselectionhorizontalmultipleselection
    Wait Until Element Is Visible        map          10s                        error message: The page don't was visible in 2 seconds
    Click Button                         map
    Click Button                         satellite
    Click Button                         map1
    Element Attribute Value Should Be    map          data-selectionindicator    isSelected
    Element Attribute Value Should Be    satellite    data-selectionindicator    isSelected
    Element Attribute Value Should Be    map1         data-selectionindicator    ${EMPTY}
