*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
drops links from level 2 to 7 when breadcrumb drop button is clicked
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-breadcrumb--limited-to-two-paths
    Wait Until Element Is Visible    ${breadcrumb}           10s
    Element Text Should Be           ${breadcrumb}           Label 1\nLabel 8
    Click Element                    ${breadcrumb} button
    Wait Until Element Is Visible    ${dropDown}             2s
    Element Text Should Be           ${dropDown}             Label 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7

show all links levels when breadcrumb is rendered
    Go To                            ${STORYBOOK_URL}/iframe.html?id=components-breadcrumb--with-url
    Wait Until Element Is Visible    ${breadcrumb}    10s
    Element Text Should Be           ${breadcrumb}    Sites\nDesign System\nPattern Library\nHome

***Variables***
${breadcrumb}    css:[id^=breadcrumb]
${dropDown}      breadcrumb3-submenu-list
