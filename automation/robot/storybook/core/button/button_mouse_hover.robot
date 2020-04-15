*** Setting ***
Library           SeleniumLibrary
Resource          ../../_resources/storybook_keywords.robot
Suite Setup       Run Keywords
...               open storybook    ${STORYBOOK_URL}/iframe.html?id=corebutton--smoke
...               AND               Wait Until Element Is Visible    css:button    10s
Suite Teardown    Close Browser
Test Template     verify element background-color change on mouse over and mouse out
Test Teardown     Run Keyword If Test Failed
...               Capture Page Screenshot       ${SUITE_NAME}_${TEST_NAME}.png
Force Tags        smoke


*** Test Cases ***                                                             button
change background color when mouse hover on button default category            default
    
change background color when mouse hover on button secondary category          secondary
    
change background color when mouse hover on button ghost category              ghost
    
change background color when mouse hover on button ghost Secondary category    ghostSecondary
    
change background color when mouse hover on button semantic category           semantic
    [Tags]    bug-firefox-webdriver    #suspects firefox is putting mouse over on element when is used keyword mouse over css:body
    
change background color when mouse hover on focused button
    [Tags]    bug-infrastructure-ie
    [Template]    NONE
    Click Button                secondary
    Alert Should Be Present
    Element Should Be Focused   secondary
    verify element background-color change on mouse over and mouse out    secondary

do not change background color when mouse hover on disabled button
    [Template]    NONE    
    verify element background-color does not change on mouse over and mouse out    disabledSecondary
