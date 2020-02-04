*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Variables          variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook
Suite Teardown     Close Browser
Test Template      select an option by locator
Default Tags       smoke
Documentation      select a option clicking in different parts of option element (icon, label, input ...)


*** Keywords ***
select an option by locator 
    [Arguments]    ${sample}    ${option}    ${locator}     ${value}
    Go To                                ${STORYBOOK_URL}/iframe.html?id=corelist--${sample}
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option}       aria-selected    ${value}
    Click Element                        ${locator}
    Element Attribute Value Should Be    ${option}       aria-selected    true

*** Test Cases ***                       sample                       option        locator                 value
single select clicking on icon           single-selection             ${option1}    css:#${option1} div     ${None}
single select clicking on label          single-selection             ${option1}    css:#${option1} p       ${None}
single select clicking on radiobutton    list-radiobutton-selector    ${option3}    css:#${option3} input   ${None}
multi select clicking on checkbox        multiselection-all           ${option5}    css:#${option5} input   false
