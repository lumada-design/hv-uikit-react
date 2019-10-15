*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Default Tags      smoke    

*** Test Cases ***
breadcrumb tooltip 2 paths visible of 8
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb3
    Wait Until Element Is Visible    //div[contains(@class,'BreadCrumb-root')]    10s
    Element Text Should Be           //div[contains(@class,'BreadCrumb-root')]    Label 1\nLabel 8
    Click Element                    //div[@role='button']
    Wait Until Element Is Visible    //div[@role='tooltip']    2s
    Element Text Should Be           //div[@role='tooltip']    Label 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7
        
breadcrumb all paths visible
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb1
    Wait Until Element Is Visible    //div[contains(@class,'BreadCrumb-root')]    10s
    Element Text Should Be           //div[contains(@class,'BreadCrumb-root')]    Label 1\nLabel 2\nLabel 3\nLabel 4\nLabel 5\nLabel 6\nLabel 7\nLabel 8\nLabel 9

breadcrumb passing url with all paths visible
    Go To                            ${STORYBOOK_URL}/iframe.html?id=corebreadcrumb--breadcrumb4
    Wait Until Element Is Visible    //div[contains(@class,'BreadCrumb-root')]    10s
    Element Text Should Be           //div[contains(@class,'BreadCrumb-root')]    Sites\nDesign System\nPattern Library\nHome
    
