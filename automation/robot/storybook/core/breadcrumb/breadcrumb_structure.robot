*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    

*** Test Cases ***
breadcrumb tooltip 2 paths visible of 8
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb3
    Wait Until Element Is Visible    css:#breadcrumb3    10s
    Element Text Should Be           css:#breadcrumb3    Label 1\nLabel 8
    Click Element                    css:#breadcrumb3 button
    Wait Until Element Is Visible    //div[@role='tooltip']    2s
    Element Text Should Be           //div[@role='tooltip']    Label 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7
        
breadcrumb all paths visible
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb1
    Wait Until Element Is Visible    css:#breadcrumb1    10s
    Element Text Should Be           css:#breadcrumb1    Label 1\nLabel 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7\nLabel 8\nLabel 9

breadcrumb passing url with all paths visible
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb4
    Wait Until Element Is Visible    css:#breadcrumb4    10s
    Element Text Should Be           css:#breadcrumb4    Sites\nDesign System\nPattern Library\nHome
    
