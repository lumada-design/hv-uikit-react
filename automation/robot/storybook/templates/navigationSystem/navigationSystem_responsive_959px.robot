*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Variables         variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Teardown     Set Window Size    1920    1080    
Force Tags        smoke    responsive
Documentation    Test Cases based on: Design System Version 1.2.0 
...              - scenario: responsive breakpoint 959px

    
*** Variables ***
${verticalText}    System\nSCPodF\nCompute\nStorage\nEthernet\nFiber Channel\nAdministration\nRest API\nLicense\nLog Bundle\nRest API\nLicense\nLog Bundle\nAnalytics\nModel Effectiveness\nSummary


*** Test Cases ***
turn 1 horizontal + 2 vertical menus into vertical navigation with 3 levels when page is resized to less than 959px
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalItems}        10s
    Set Window Size                      959                       1000               True
    Wait Until Element Is Not Visible    ${horizontalItems}        4s
    Click Button                         ${horizontalBurger}
    Wait Until Element Is Visible        ${verticalItems}          4s
    Element Text Should Be               ${verticalItems}          ${verticalText}
    Page Should Contain Element          ${verticalItemsLevel1}    limit=4
    Page Should Contain Element          ${verticalItemsLevel2}    limit=6
    Page Should Contain Element          ${verticalItemsLevel3}    limit=6

turn vertical navigation with 3 levels into 1 horizontal + 2 vertical menus when page is resized to more than 959px
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalItems}    10s
    Page Should Contain Element          ${horizontalItems}    limit=4
    Set Window Size                      959                   1000       True
    Wait Until Element Is Not Visible    ${horizontalItems}    4s
    Set Window Size                      1920                  1080       True
    Wait Until Element Is Visible        ${horizontalItems}    4s
    Page Should Contain Element          ${horizontalItems}    limit=4

turn horizontal actions into vertical actions when page is resized to less than 959px 
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalActions}           10s
    Page Should Contain Element          ${horizontalActions}>button    limit=3
    Set Window Size                      959                            1000                 True
    Wait Until Element Is Not Visible    ${horizontalItems}             4s
    Page Should Contain Element          ${horizontalActions}>button    limit=1
    Click Button                         ${horizontalBurger}
    Wait Until Element Is Visible        ${verticalItems}               4s
    Page Should Contain Element          ${verticalActions}>div         limit=2
    Element Text Should Be               ${verticalActions}             Settings\nProfile

change vertical items when select other horizontal item
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalActions}    10s
    Click Element                        ${verticalBurger}
    Element Text Should Be               ${verticalItems}        SCPodF\nCompute\nStorage\nEthernet\nFiber Channel    
    Click Element                        ${horizontalItem3}
    Click Element                        ${verticalBurger}
    Wait Until Element Is Visible        ${verticalItems}        4s
    Element Text Should Be               ${verticalItems}        Model Effectiveness

doesn't show vertical bar when horizontal item doesn't have child
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalActions}    10s
    Click Element                        ${horizontalItem4}
    Wait Until Element Is Not Visible    ${verticalBurger}       4s
    Element Should Not Be Visible        ${verticalAnchorBar}

keep header item selection into vertical navigation when page is resized to less than 959px
    Go To                                ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Wait Until Element Is Visible        ${horizontalActions}       10s
    Click Element                        ${horizontalItem4}
    Set Window Size                      959                        1000       True
    Wait Until Element Is Not Visible    ${horizontalItems}         4s
    Wait Until Element Is Visible        ${verticalItems}           4s
    Element Text Should Be               ${verticalSelectedItem}    Summary       

keep vertical navigation selection when page is resized to more than 959px
    Go To                            ${STORYBOOK_URL}/iframe.html?id=template-navigationsystem--header1vertical2
    Set Window Size                  959                          1000              True
    Wait Until Element Is Visible    ${horizontalBurger}          10s
    Click Element                    ${horizontalBurger}
    Wait Until Element Is Visible    ${verticalItems}             4s
    Click Element                    ${verticalItem2.3.2}
    Set Window Size                  1920                         1080
    Element Text Should Be           ${horizontalSelectedItem}    Administration
    
*** Comments ***
Test scenarios to do!
    
    1 horizontal menu is replaced into 1 vertical menu 
    1 horizontal + 1 vertical menus are replaced into 2 vertical menus     
    2 horizontal menus are replaced into 2 vertical menus 
    2 horizontal + 1 vertical menus non collapsible are replaced into 3 vertical menus 
    2 horizontal + 2 vertical menus are replaced into 3 vertical menus 
    marked actions buttons remains on horizontal menu (e.g. notifications)