*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke    bug-jenkins
Documentation
...               bug-jenkins label:
...               TC fails just when executed via jenkins, otherwise run test manually or via locally they always pass.

*** Test Cases ***
change focus on click other container
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled      //p[text()='Events']    15s
    Page Should Contain Element        //div[contains(@class,'Navigation-selected') and contains(.,'Overview')]
    Click Element                      //p[text()='Events']
    Page Should Not Contain Element    //div[contains(@class,'Navigation-selected') and contains(.,'Overview')]
    Page Should Contain Element        //div[contains(@class,'Navigation-selected') and contains(.,'Events')]

when is selected submenu the parent menu is also selected
    Go To                               ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled       //p[text()='Analytics']         15s
    Page Should Not Contain Element     //div[contains(@class,'Navigation-selected') and contains(.,'Analytics')]
    Page Should Not Contain Element     //p[text()='Trend analysis']
    Mouse Over                          //p[text()='Analytics']
    Wait Until Element Is Visible       //p[text()='Trend analysis']    2s
    Wait Until Keyword Succeeds         3                               1     Click Element    //p[text()='Trend analysis']
    Wait Until Page Contains Element    //div[contains(@class,'Navigation-selected') and contains(.,'Analytics')]    2s
    Page Should Contain Element         //div[contains(@class,'Navigation-selected') and contains(.,'Trend analysis')]

mouse hover container drop sub menu
    Go To                              ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled      //p[text()='Analytics']         15s
    Page Should Not Contain Element    //p[text()='Trend analysis']
    Mouse Over                         (//div[@role='button' and contains(.,'Analytics')])[1]
    Wait Until Element Is Visible      //p[text()='Trend analysis']    2s

sub menu container selected hides when mouse hover on menu containers
    Go To                                       ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled               //p[text()='Analytics']         15s
    Click Element                               //p[text()='Analytics']
    Wait Until Element Is Enabled               //p[text()='Trend analysis']    2s
    Click Element                               //p[text()='Trend analysis']
    Mouse Over                                  //p[text()='Events']
    Wait Until Page Does Not Contain Element    //div[contains(@class,'Navigation-selected') and contains(.,'Trend analysis')]    2s

all icons on action area are enable
    Go To                            ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled    //p[text()='Analytics']    15s
    Element Should Be Enabled        (//div[contains(@class,'Actions-iconContainer')])[1]
    Element Should Be Enabled        (//div[contains(@class,'Actions-iconContainer')])[1]
    Element Should Be Enabled        (//div[contains(@class,'Actions-iconContainer')])[1]

#notes
# don't is clear, easy to distinct the level on component (what is menu, submenu sub-sub-menu ...
