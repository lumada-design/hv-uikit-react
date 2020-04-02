*** Setting ***
Variables          ../../_resources/storybook_variables.yaml
Resource           ../../_resources/storybook_keywords.robot
Library            SeleniumLibrary
Suite Setup        open storybook on small size
Suite Teardown     Close Browser
Force Tags         smoke
Documentation      https://github.com/pentaho/hv-uikit-react/issues/831


*** Variable ***
${navButton}          css:[role=button]
${optionAnalytics}    xpath:(//li[contains(.,'Analytics')]/div)[1]
${navBackIcon}        css:div[class='HvVerticalNavigationTitle-navIcon']


*** Test Cases ***
Open and close header
    Go To                                                   ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled                           ${navButton}                                           7s
    Page Should Not Contain                                 Analytics
    Click Element                                           ${navButton}
    Wait Until Page Contains                                Analytics                                              2s
    Click Element                                           ${navButton}
    Wait Until Page Does Not Contain                        Analytics                                              2s

navigate to submenu and then close
    Go To                                                   ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled                           ${navButton}                                           7s
    Click Element                                           ${navButton}
    Wait Until Element Is Enabled                           ${optionAnalytics}                                     2s
    Page Should Not Contain                                 Model Effectiveness
    Click Element                                           ${optionAnalytics}
    Wait Until Page Contains                                Model Effectiveness                                    2s
    Click Element                                           ${navButton}
    Wait Until Page Does Not Contain                        Analytics                                              2s

navigate to submenu clicking on item label
    Go To                                                   ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled                           ${navButton}                                           7s
    Click Element                                           ${navButton}
    Wait Until Element Is Enabled                           xpath://p[text()='Analytics']                          2s
    Click Element                                           xpath://p[text()='Analytics']
    Wait Until Page Contains                                Model Effectiveness                                    2s

navigate back from submenu clicking on title label
    navigate back from submenu clicking on                  xpath://p[text()='Analytics']

navigate back from submenu clicking on title icon
    navigate back from submenu clicking on                  ${navBackIcon}

*** Keywords ***
open storybook on small size
    open storybook
    Set Window Size                                         599                                                    599

navigate back from submenu clicking on
    [Arguments]                                             ${locator}
    Go To                                                   ${STORYBOOK_URL}/iframe.html?id=coreheader--header1
    Wait Until Element Is Enabled                           ${navButton}                                           7s
    Click Element                                           ${navButton}
    Wait Until Element Is Enabled                           ${optionAnalytics}                                     2s
    Click Element                                           ${optionAnalytics}
    Wait Until Element Is Enabled                           ${locator}                                             2s
    Click Element                                           ${locator}
    Wait Until Page Contains                                Overview                                               2s
