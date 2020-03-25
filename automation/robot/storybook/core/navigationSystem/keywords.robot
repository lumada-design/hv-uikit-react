*** Settings ***
Library      SeleniumLibrary
Resource     ../../_resources/storybook_keywords.robot


*** Keywords ***
header item should be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute contain    ${locator}    class    selectedItem
    
header item should not be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute not contain    ${locator}    class    selectedItem
    
vertical navigation item should be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute contain    ${locator}    class    -selected
    
vertical navigation item should not be selected
    [Arguments]    ${locator}
    [Documentation]    verify if locator contains selectedItem in class attribute
    wait until element attribute contain    ${locator}    class    -unselected
        