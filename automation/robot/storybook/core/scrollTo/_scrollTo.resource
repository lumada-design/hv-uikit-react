*** Setting ***
Resource    ../_keywords.resource

*** Keywords ***
open scroll to horizontal sample
    [Arguments]    ${sample}
    Go To    ${navigation}scrollto-horizontal--${sample}
    Wait Until Page Contains Element    ${scrollroot}

open scroll to vertical sample
    [Arguments]    ${sample}
    Go To    ${navigation}scrollto-vertical--${sample}
    Wait Until Page Contains Element    ${scrollroot}

get current scroll position
    [Arguments]    ${elementId}
    ${scrollPosition}  Execute Javascript  return document.getElementById("${elementId}").scrollTop;
    [Return]    ${scrollPosition}

*** Variables ***
${containerId}            pageContentId
${scrollroot}             css:#WithContent
${firstButton}            css:#WithContent-item-0
${secondButton}           css:#WithContent-item-1
${thirdButton}            css:#WithContent-item-2
${fourthButton}           css:#WithContent-item-3
${firstInput}             css:#ele1-input
${secondInput}            css:#ele2-input
${thirdInput}             css:#ele3-input
${fourthInput}            css:#ele4-input
