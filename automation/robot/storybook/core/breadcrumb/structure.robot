*** Setting ***
Resource    ../_keywords.resource


*** Test Cases ***
drops links from level 2 to 7 when breadcrumb drop button is clicked
    [setup]    Go To    ${components}navigation-breadcrumb--limited-to-two-paths
    Wait Until Element Is Visible    ${breadcrumb}
    Element Text Should Be           ${breadcrumb}           Label 1\nLabel 8
    Click Element                    ${breadcrumb} button
    Wait Until Element Is Visible    ${dropDown}
    Element Text Should Be           ${dropDown}    ${label_text}

show all links levels when breadcrumb is rendered
    [setup]    Go To    ${components}navigation-breadcrumb--with-url
    Wait Until Element Is Visible    ${breadcrumb}
    Element Text Should Be           ${breadcrumb}    ${label_text2}


***Variables***
${breadcrumb}     css:[id^=breadcrumb]
${dropDown}       breadcrumb3-submenu-list
${label_text}     Label 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7
${label_text2}    Sites\nDesign System\nPattern Library\nHome
