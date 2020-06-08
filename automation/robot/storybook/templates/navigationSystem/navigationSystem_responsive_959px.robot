*** Setting ***
Resource          ../../_resources/keywords.resource
Variables         variables.yaml
Suite Setup       open storybook
Suite Teardown    Close Browser
Test Setup        wait until template is opened
Test Teardown     restore default windows size 1920 1080
Force Tags        responsive
Documentation    Test Cases based on: Design System Version 1.2.0
...              - scenario: responsive breakpoint 959px


*** Keywords ***
wait until template is opened
    Go To                            ${STORYBOOK_URL}/iframe.html?id=template--navigationsystem
    Wait Until Element Is Visible    ${horizontalItems}

reduce windows size to 959 1000
    Set Window Size    959    1000    True


*** Test Cases ***
turn dual navigation into just vertical levels when page is resized to less than 959px
    reduce windows size to 959 1000
    Wait Until Element Is Not Visible    ${horizontalItems}
    Click Button                         ${horizontalBurger}
    Wait Until Element Is Visible        ${verticalItems}
    Element Text Should Be               ${verticalItems}          ${verticalText}
    Page Should Contain Element          ${verticalItemsLevel1}    limit=4
    Page Should Contain Element          ${verticalItemsLevel2}    limit=6
    Page Should Contain Element          ${verticalItemsLevel3}    limit=6

turn vertical navigation into dual navigation when page is resized to more than 959px
    Page Should Contain Element               ${horizontalItems}    limit=4
    reduce windows size to 959 1000
    Wait Until Element Is Not Visible         ${horizontalItems}
    restore default windows size 1920 1080
    Wait Until Element Is Visible             ${horizontalItems}
    Page Should Contain Element               ${horizontalItems}    limit=4

turn horizontal actions into vertical actions when page is resized to less than 959px
    Page Should Contain Element          ${horizontalActions}>button    limit=3
    reduce windows size to 959 1000
    Wait Until Element Is Not Visible    ${horizontalItems}
    Page Should Contain Element          ${horizontalActions}>button    limit=1
    Click Button                         ${horizontalBurger}
    Wait Until Element Is Visible        ${verticalItems}
    Page Should Contain Element          ${verticalActions}>div         limit=2
    Element Text Should Be               ${verticalActions}             Settings\nProfile

keep marked actions on horizontal menu when page is resized to less than 959px
    Page Should Contain Element          ${horizontalActions}>button    limit=3
    reduce windows size to 959 1000
    Page Should Contain Element          ${horizontalActions}>button    limit=1
    Element Attribute Value Should Be    ${horizontalActions}>button    aria-label    alert

keep header item selection into vertical navigation when page is resized to less than 959px
    Element Text Should Be                    ${horizontalItem4}     Summary
    Click Element                             ${horizontalItem4}
    reduce windows size to 959 1000
    Wait Until Element Is Visible             ${horizontalBurger}
    Click Element                             ${horizontalBurger}
    element attribute value should contain    ${verticalItem4}       class      -selected
    Element Text Should Be                    ${verticalItem4}       Summary

keep vertical navigation selection when page is resized to more than 959px
    reduce windows size to 959 1000
    Wait Until Element Is Visible             ${horizontalBurger}
    Click Element                             ${horizontalBurger}
    Wait Until Element Is Visible             ${verticalItems}
    Element Text Should Be                    ${verticalItem2}        Administration
    Element Text Should Be                    ${verticalItem2.3.2}    License
    Click Element                             ${verticalItem2.3.2}
    restore default windows size 1920 1080
    element attribute value should contain    ${horizontalItem2}      class    -selected
    Element Text Should Be                    ${horizontalItem2}      Administration


*** Comments ***
Test scenarios to do!
1 horizontal menu is replaced into 1 vertical menu
1 horizontal + 1 vertical menus are replaced into 2 vertical menus
2 horizontal menus are replaced into 2 vertical menus
2 horizontal + 1 vertical menus non collapsible are replaced into 3 vertical menus
2 horizontal + 2 vertical menus are replaced into 3 vertical menus
marked actions buttons remains on horizontal menu (e.g. notifications)