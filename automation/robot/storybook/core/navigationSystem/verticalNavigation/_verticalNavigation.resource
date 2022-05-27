*** Settings ***
Resource    ../../_keywords.resource


*** Keywords ***
open vertical navigation sample
    [Arguments]    ${dir}    ${sample}
    Go To                            ${dir}structure-vertical-navigation--${sample}
    Wait Until Element Is Visible    ${burger}
    Click Element                    ${burger}
    Wait Until Element Is Visible    ${items}

vertical navigation item should be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute contain    ${locator}    class    -selected

vertical navigation item should not be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute contain    ${locator}    class    -unselected


*** Variables ***
${action1}         css:div[class*=Actions-root]>div:nth-child(1)
${action2}         css:div[class*=Actions-root]>div:nth-child(2)
${action3}         css:div[class*=Actions-root]>div:nth-child(3)
${actions}         css:div[class*=Actions-root]
${anchorBar}       css:div[class*=VerticalContainer-anchorBar]
${burger}          css:button[id*=hamburger-button]     #css:button[aria-label='open']
${expanded}        id:sample3-container-container
${item1.1.1}       css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)>ul>li:nth-child(1)
${item1.1.2}       css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)>ul>li:nth-child(2)
${item1.1.3}       css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)>ul>li:nth-child(3)
${item1.1.4}       css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)>ul>li:nth-child(4)
${item1.1}         css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)
${item1.1Items}    css:nav>ul>li:nth-child(1)>ul>li:nth-child(1)>ul>li
${item1}           css:nav>ul>li:nth-child(1)
${item1Items}      css:nav>ul>li:nth-child(1)ul>li
${item2.1}         css:nav>ul>li:nth-child(2)>ul>li:nth-child(1)
${item2.2}         css:nav>ul>li:nth-child(2)>ul>li:nth-child(2)
${item2.3.1}       css:nav>ul>li:nth-child(2)>ul>li:nth-child(3)>ul>li:nth-child(1)
${item2.3.2}       css:nav>ul>li:nth-child(2)>ul>li:nth-child(3)>ul>li:nth-child(2)
${item2.3}         css:nav>ul>li:nth-child(2)>ul>li:nth-child(3)
${item2.3Items}    css:nav>ul>li:nth-child(2)>ul>li:nth-child(3)>ul>li
${item2.4}         css:nav>ul>li:nth-child(2)>ul>li:nth-child(4)
${item2}           css:nav>ul>li:nth-child(2)
${item2Items}      css:nav>ul>li:nth-child(2)ul>li
${items}           css:nav>ul>li
${navigation}      css:nav
