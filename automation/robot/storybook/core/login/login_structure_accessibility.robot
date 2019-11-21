*** Setting ***
Variables         ../../_resources/storybook_variables.yaml
Resource          ../../_resources/storybook_keywords.robot
Library           SeleniumLibrary
Suite Setup       open storybook
Suite Teardown    Close Browser
Force Tags        smoke

*** Test Cases ***
verify correct iteration with keyboard tab
    Go To                               ${STORYBOOK_URL}/iframe.html?id=corelogin--login5
    Wait Until Element Is Enabled       css:input[name='username']                7s
    Element Should Be Focused           css:input[name='username']
    Press Keys                          css:input[name='username']                TAB
    Element Should Be Focused           css:input[type='password']
    Press Keys                          css:input[type='password']                TAB
    #Element Should Be Focused          //label[contains(@class,'HvCheckbox')]    #AssertionError("Element '%s' does not have focus." % locator)
    Press Keys                          //label[contains(@class,'HvCheckbox')]    TAB
    Element Should Be Focused           //button[contains(.,'Log in')]
    Press Keys                          //button[contains(.,'Log in')]            TAB
    Element Should Be Focused           //button[contains(.,'Forgot your credentials?')]
    Press Keys                          //button[contains(.,'Forgot your credentials?')]    SPACE
    Wait Until Page Contains Element    css:input[placeholder='Enter Email']      2s
    Element Should Be Focused           css:input[placeholder='Enter Email']
    Press Keys                          css:input[placeholder='Enter Email']      TAB
    Element Should Be Focused           //button[contains(.,'Recover')]
    Press Keys                          //button[contains(.,'Recover')]           TAB
    Element Should Be Focused           //button[contains(.,'Cancel')]
