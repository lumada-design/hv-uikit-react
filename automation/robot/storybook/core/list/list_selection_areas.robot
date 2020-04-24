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
    Go To                                ${STORYBOOK_URL}/iframe.html?id=components-list--${sample}
    Wait Until Element Is Visible        ${list}       10s
    Element Attribute Value Should Be    ${option}       aria-selected    ${value}
    Click Element                        css:#${locator}
    Element Attribute Value Should Be    ${option}       aria-selected    true

*** Test Cases ***                       sample                             option        locator            value
single select clicking on icon           single-selection-with-icon         ${option1}    ${option1} div     ${None}
single select clicking on label          single-selection-with-icon         ${option1}    ${option1} p       ${None}
single select clicking on radiobutton    single-selection-with-selectors    ${option3}    ${option3} input   ${None}
multi select clicking on checkbox        multi-selection-with-select-all    ${option5}    ${option5} input   false
