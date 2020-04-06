*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       Run Keywords
...               open storybook     ${STORYBOOK_URL}/iframe.html?id=coreheader--header1    AND
...               Set Window Size    599    599
Test Setup        Run Keywords
...               Reload Page                      AND
...               Wait Until Element Is Enabled    ${navButton}    7s
Suite Teardown    Close Browser
Force Tags        smoke


*** Variable ***
${navButton}               css:[role=button]
${optionAnalytics}         xpath:(//li[contains(.,'Analytics')]/div)[1]
${navBackButton}           css:[role=button][class*=NavigationTitle]
${optionAnalyticsLabel}    xpath://li[@role='option']/p[text()='Analytics']


*** Test Cases ***
Open and close header
    Page Should Not Contain             Analytics
    Click Element                       ${navButton}
    Wait Until Page Contains            Analytics                  3s
    Click Element                       ${navButton}
    Wait Until Page Does Not Contain    Analytics                  3s

navigate to submenu and then close
    Click Element                       ${navButton}
    Wait Until Element Is Enabled       ${optionAnalytics}         3s
    Page Should Not Contain             Model Effectiveness
    Click Element                       ${optionAnalytics}
    Wait Until Page Contains            Model Effectiveness        3s
    Click Element                       ${navButton}
    Wait Until Page Does Not Contain    Analytics                  3s

navigate to submenu clicking on item label
    Click Element                       ${navButton}
    Wait Until Element Is Enabled       ${optionAnalyticsLabel}    3s
    Click Element                       ${optionAnalyticsLabel}
    Wait Until Page Contains            Model Effectiveness        3s

navigate back from submenu clicking on title button
    Click Element                       ${navButton}
    Wait Until Element Is Enabled       ${optionAnalytics}         3s
    Click Element                       ${optionAnalytics}
    Wait Until Element Is Enabled       ${navBackButton}           3s
    Click Element                       ${navBackButton}
    Wait Until Page Contains            Overview                   3s


