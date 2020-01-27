*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Variables          variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook
Suite Teardown     Close Browser
Test Template      select an item by locator
Default Tags       smoke
Documentation      select a item clicking in different parts of item element (icon, label, input ...)


*** Keywords ***
select an item by locator 
    [Arguments]    ${sample}    ${item}    ${locator}
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--${sample}
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${item}       aria-selected    ${None}
    Click Element                        ${locator}
    Element Attribute Value Should Be    ${item}       aria-selected    true
    

*** Test Cases ***                       sample                       item        locator
single select clicking on icon           single-selection             ${item1}    css:#${item1} div
single select clicking on label          single-selection             ${item1}    css:#${item1} p
single select clicking on radiobutton    list-radiobutton-selector    ${item3}    css:#${item3} input
single select clicking on checkbox       multiselection-all           ${item5}    css:#${item5} input